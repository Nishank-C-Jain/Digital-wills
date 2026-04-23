const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

// Freeze a user account
router.post("/freeze/:userId", auth, async (req, res) => {
  try {
    // In a real app, verify req.user is an admin
    const userToFreeze = await User.findById(req.params.userId);
    if (!userToFreeze) {
      return res.status(404).json({ msg: "User not found" });
    }

    userToFreeze.isFrozen = true;
    await userToFreeze.save();

    res.json({ msg: "Account successfully frozen" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all wills for admin view
router.get("/wills", auth, async (req, res) => {
  try {
    const Will = require("../models/Will");
    const wills = await Will.find().populate("userId", "name email isFrozen").sort({ createdAt: -1 });
    res.json(wills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
