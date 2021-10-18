const { Schema, model, Types } = require('mongoose')

const ReactionSchema = new Schema (
    {
       reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
       },
       reactionBody: {
           type: String,
           required: true,
           maxlength: 280
       },
       username: [{
           type: Schema.Types.ObjectId,
           ref: 'User',
           required: true
       }], 
    },
)

const Reactions = model('Reaction', ReactionSchema);

module.exports = Reactions;