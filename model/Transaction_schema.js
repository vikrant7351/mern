const mongoose = require('mongoose');
// Define Transaction Schema (for adding and withdrawing money)
const transactionSchema = new mongoose.Schema({
    userId: {
      // type:String,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['deposit', 'withdrawal'],
      required: true,
    },
    // Additional fields like transaction date, transaction ID, etc.
  });

  // const Transaction = mongoose.model('Transaction', transactionSchema);
  module.exports = transactionSchema;