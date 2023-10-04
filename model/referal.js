const mongoose = require('mongoose');

// Define User Schema
const referralSchema = new mongoose.Schema({
  
    referralCode: {
      type: String,
      unique: true,
      required:true,
      trim:true,
    }

  });

 module.exports = referralSchema;