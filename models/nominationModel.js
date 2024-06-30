const mongoose = require('mongoose');

const nominationSchema = mongoose.Schema(
  {
    nomineeName: {
      type: String,
      required: [true, 'Please enter a nominee name'],
    },

    field: {
      type: String,
      required: [true, 'Please enter a nominee name'],
    },

    category: {
      type: String,
      required: [true, 'Please enter a nominee name'],
    },
    userEmail: {
      type: String,
      required: [true, 'Please enter a nominee name'],
    },
  },
  {
    timestamps: true,
  }
);

const Nomination = mongoose.model('Nomination', nominationSchema);
module.exports = Nomination;
