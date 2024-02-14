const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is a model created for 'user'
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        default: 0
    },
    gender:{
        type: String,
        default: 'Rather-Not-Say'
    },
    date:{
        type: Date,
        default: Date.now
    },
    profileimg:{
        type: String,
        default: "images/pfp_blank.png"
    }
  });

  const User = mongoose.model('user', UserSchema);
  User.createIndexes();
  module.exports = User;