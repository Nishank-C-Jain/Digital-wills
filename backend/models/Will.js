const mongoose = require("mongoose");
const { encrypt, decrypt } = require("../utils/encryption");

const willSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String, // This will be encrypted
    required: true
  },
  beneficiaries: [{
    name: String,
    relationship: String,
    allocation: Number // Percentage or amount
  }],
  assets: [{
    assetName: String,
    assetType: String,
    value: Number
  }],
  aiAnalysis: {
    riskScore: { type: Number, default: 0 },
    sentiment: { type: String, default: "Neutral" },
    flags: [String]
  },
  blockchainHash: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ["draft", "finalized", "executed"],
    default: "draft"
  },
  isDeceased: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to encrypt content before saving
willSchema.pre("save", function () {
  if (this.isModified("content")) {
    this.content = encrypt(this.content);
  }
});

// Helper method to get decrypted content
willSchema.methods.getDecryptedContent = function() {
  return decrypt(this.content);
};

module.exports = mongoose.model("Will", willSchema);
