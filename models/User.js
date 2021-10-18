const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: 'First Name is Required'
    },

    lastName: {
      type: String,
      trim: true,
      required: 'Last Name is Required'
    },

    password: {
      type: String,
      trim: true,
      required: 'Password is Required',
      validate: [({ length }) => length >= 6, 'Password should be longer.']
    },

    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },

    userCreated: {
      type: Date,
      default: Date.now
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }

);

UserSchema.virtual('friendCount').get(function(){
  return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;
