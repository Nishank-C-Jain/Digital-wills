const Will = require("../models/Will");

// Create a new will
exports.createWill = async (req, res) => {
  try {
    const { title, content, beneficiaries, assets, status } = req.body;
    const userId = req.user.id; // from auth middleware

    // Call the AI module here before saving
    let aiAnalysis = { riskScore: 0, sentiment: "Neutral", flags: [] };
    try {
      const axios = require('axios');
      const response = await axios.post('http://localhost:5001/api/analyze', { content });
      aiAnalysis = response.data;
    } catch (aiError) {
      console.error("AI Analysis failed or server not running:", aiError.message);
    }

    // Generate SHA-256 hash for blockchain
    const crypto = require('crypto');
    const blockchainHash = crypto.createHash('sha256').update(content + title + Date.now()).digest('hex');

    const newWill = new Will({
      userId,
      title,
      content, // Mongoose pre-save hook will encrypt this
      beneficiaries: beneficiaries || [],
      assets: assets || [],
      status: status || 'draft',
      aiAnalysis,
      blockchainHash
    });

    await newWill.save();
    res.status(201).json({ msg: "Will created successfully", will: newWill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all wills for the authenticated user
exports.getWills = async (req, res) => {
  try {
    const wills = await Will.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    // Decrypt content before sending
    const decryptedWills = wills.map(w => {
      const willObj = w.toObject();
      willObj.content = w.getDecryptedContent();
      return willObj;
    });

    res.json(decryptedWills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single will by ID
exports.getWillById = async (req, res) => {
  try {
    const will = await Will.findOne({ _id: req.params.id, userId: req.user.id });
    if (!will) return res.status(404).json({ msg: "Will not found" });

    const willObj = will.toObject();
    willObj.content = will.getDecryptedContent();
    res.json(willObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a will
exports.deleteWill = async (req, res) => {
  try {
    const will = await Will.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!will) return res.status(404).json({ msg: "Will not found" });

    res.json({ msg: "Will deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Re-analyze a will
exports.analyzeAgain = async (req, res) => {
  try {
    const will = await Will.findOne({ _id: req.params.id, userId: req.user.id });
    if (!will) return res.status(404).json({ msg: "Will not found" });

    const decryptedContent = will.getDecryptedContent();

    let aiAnalysis = { riskScore: 0, sentiment: "Neutral", flags: [] };
    try {
      const axios = require('axios');
      const response = await axios.post('http://localhost:5001/api/analyze', { content: decryptedContent });
      aiAnalysis = response.data;
    } catch (aiError) {
      console.error("AI Analysis failed or server not running:", aiError.message);
    }

    will.aiAnalysis = aiAnalysis;
    await will.save();

    res.json({ msg: "Analysis re-run successfully", aiAnalysis });
  } catch (error) {
    console.error("Analysis failed:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Verify death (Blockchain trigger simulation)
exports.verifyDeath = async (req, res) => {
  try {
    const will = await Will.findOne({ _id: req.params.id });
    if (!will) return res.status(404).json({ msg: "Will not found" });

    // In a real app, this would call ethers.js and hit the smart contract
    console.log(`Verifying death for Will: ${will.blockchainHash} on Smart Contract...`);

    will.status = 'executed';
    await will.save();

    res.json({ msg: "Death verified via blockchain. Will is now Executed." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update status (e.g. pending manual review)
exports.updateStatus = async (req, res) => {
  try {
    const will = await Will.findOne({ _id: req.params.id });
    if (!will) return res.status(404).json({ msg: "Will not found" });

    will.status = req.body.status;
    await will.save();

    res.json({ msg: `Will status updated to ${will.status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Claim Assets
exports.claimAssets = async (req, res) => {
  try {
    const will = await Will.findOne({ _id: req.params.id });
    if (!will) return res.status(404).json({ msg: "Will not found" });

    if (will.status !== 'executed') {
      return res.status(400).json({ msg: "Cannot claim assets until the Will is executed." });
    }

    // Simulate smart contract transfer
    will.status = 'claimed';
    await will.save();

    res.json({ msg: "Success! Assets have been successfully claimed and transferred to your wallet via the Smart Contract." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
