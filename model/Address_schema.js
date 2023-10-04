const mongoose = require('mongoose');
// Define Contract Address Schema
const contractAddressSchema = new mongoose.Schema({
    userId: {
      type:String,
      ref: 'User',
      required: true,
      trim:true,
      unique:true,
    },
    contractAddress: {
      type: String,
      unique:true,
      required: true,
      trim:true,      
    },
    // Other contract-related fields like contract name, description, etc.
  });



  module.exports = contractAddressSchema;
