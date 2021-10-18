const { Thought, User, Reaction } = require('../models');

const reactionController = {
    addReaction({ params, body}, res){
        console.log(params)
        Reaction.create(body)
        .then(({ _id }) => {
            return Thought.findOneAndUpdate(
                { _id: params.id },
                { $push: { reactions: _id }},
                { new: true }
            )
        })
        .then(reactionData => {
            if(!reactionData){
                res.status(404).json({message: 'No thought with this Id' })
                return;
            }

        res.json(reactionData)})
        .catch(err => res.json(err))
    },
    removeReaction({params}, res){
        Reaction.findOneAndDelete({ _id: params.id})
        .then(deletedReaction => {
            if(deletedReaction){
                res.status(404).json({ message: 'No reaction with this id' })
                return;
            }
            res.json(deletedReaction)
        })
        .catch(err => res.json(err))
    }

}

module.exports = reactionController;