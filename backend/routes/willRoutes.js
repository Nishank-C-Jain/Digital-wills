const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createWill,
  getWills,
  getWillById,
  deleteWill
} = require("../controllers/willController");

router.post("/create", auth, createWill);
router.get("/all", auth, getWills);
router.get("/:id", auth, getWillById);
router.delete("/:id", auth, deleteWill);
router.put("/:id/analyze", auth, require("../controllers/willController").analyzeAgain);
router.post("/:id/verify-death", auth, require("../controllers/willController").verifyDeath);
router.put("/:id/status", auth, require("../controllers/willController").updateStatus);
router.post("/:id/claim", auth, require("../controllers/willController").claimAssets);

module.exports = router;
