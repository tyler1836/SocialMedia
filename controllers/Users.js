const { User } = require('../models');

const userController = {
    getUsers(req, res){
        User.find({}).populate({path: 'thoughts', select: '-__v'})
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err))
    },

    createUser({body}, res){
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.json(err))
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