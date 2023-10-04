const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim:true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      trim:true,
    },
    mobile_no:{
      type:Number,
      required:true,
      unique:true,
      trim:true,
    },
    password: {
      type: String,
      required: true,
      trim:true,

    },
    referralCode: {
      type: String,
      // unique: true,
      required:true,
      trim:true,

    },
    referredBy: {
      type: mongoose.Schema.Types.String,
      required:true,
      // ref: 'User',
    },
    leftChild: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rightChild: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  });

 module.exports = userSchema;