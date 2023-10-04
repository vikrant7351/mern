const mongoose = require('mongoose');
// Define Support Ticket Schema
const supportTicketSchema = new mongoose.Schema({
  TicketId:{
    type:String,
    required:true,
    trim:true,
  },
    userId: {
      type:String,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'pending'],
      default: 'open',
    },
    // Other ticket-related fields like ticket creation date, comments, etc.
  });



  module.exports = supportTicketSchema ;