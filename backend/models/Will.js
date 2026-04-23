const mongoose = require("mongoose");

const willSchema = new mongoose.Schema({
  text: String,
  beneficiary: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Will", willSchema);
