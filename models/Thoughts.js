const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },

        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }]

      
},
{
    toJson: {
    virtuals: true,
    getters: true
    },
    id: false
  }
)

ThoughtSchema.virtual('reactionview').get(function(){
    return this.reactions.length;
})

const Thoughts = model('Thought', ThoughtSchema);

module.exports = Thoughts;