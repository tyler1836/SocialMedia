const {Thought, User} = require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({}).populate({path: 'reactions'}).then(thoughtData => res.json(thoughtData))
        .catch(err => res.sendStatus(400).json(err))
    },

    createThought({ params, body}, res){
        console.log(params)
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.id },
                { $push: { thoughts: _id }},
                { new: true }
            )
        })
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'No user with this Id' })
                return;
            }

        res.json(thoughtData)})
        .catch(err => res.json(err))
    },

    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'No thought found with this id'})
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err))
    },

    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({message: 'No though with this id'})
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = thoughtController;