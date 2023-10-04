const mongoose = require('mongoose');
// Define Bank Details Schema
const bankDetailsSchema = new mongoose.Schema({
    userId: {
      type:String,
      // type: mongoose.Schema.Types.String,
      // ref: 'User',
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    IFSCcode:{
      type:String,
      required:true
    },
    Banktype:{
        type: String,
        enum: ['Current', 'Saving'],
        required: true,
      },

    // Other bank details like branch, IFSC code, etc.
  });

  // const BankDetails = mongoose.model('BankDetails', bankDetailsSchema);

  module.exports = bankDetailsSchema;