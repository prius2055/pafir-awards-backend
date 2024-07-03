const mongoose = require('mongoose');

const nominationSchema = mongoose.Schema(
  {
    nomineeName: {
      type: String,
      required: [true, 'Please enter a nominee name'],
    },

    field: {
      type: String,
      required: [true, 'Please enter a nomination field'],
    },

    category: {
      type: String,
      required: [true, 'Please enter a nomination category'],
    },
    userEmail: {
      type: String,
      required: [true, 'Please enter your valid email'],
    },
  },
  {
    timestamps: true,
  }
);

const Nomination = mongoose.model('Nomination', nominationSchema);
module.exports = Nomination;
