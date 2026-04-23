const Will = require("../models/Will");

// CREATE WILL
exports.createWill = async (req, res) => {
  try {
    const { text, beneficiary } = req.body;

    const newWill = new Will({ text, beneficiary });
    await newWill.save();

    res.json({ message: "Will saved successfully", data: newWill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL WILLS
exports.getWills = async (req, res) => {
  try {
    const wills = await Will.find();
    res.json(wills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE WILL
exports.deleteWill = async (req, res) => {
  try {
    await Will.findByIdAndDelete(req.params.id);
    res.json({ message: "Will deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
