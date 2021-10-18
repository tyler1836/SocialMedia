const { User } = require('../models');

const userController = {
    getUsers(req, res){
        User.find({})
        .populate({ path: 'thoughts',
        populate:  {path: 'reactions', model: 'Reaction'} } )
        .populate({ path: 'friends' } )
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err))
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v'
        })
        .populate({path: 'friends'})
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    createUser({body}, res){
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.json(err))
    },

    addFriend({params}, res){
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: {friends: params.friendId } },
            {new: true}
        )
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'No user found with this id'})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))

    },

    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            { $pull: {friends: params.friendId } }
            )
        .then(deletedFriend => {
            if(!deletedFriend){
                res.status(404).json({message: 'You are not friends with this person'})
                return;
            }
            res.json(userData)
        }).catch(err => res.json(err))
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'No user found with this id'})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(userData => {
            if(!userData){
                res.status(404).json({message: 'No though with this id'})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err))
    }
};


module.exports = userController