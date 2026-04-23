const express = require("express");
const router = express.Router();
const {
  createWill,
  getWills,
  deleteWill
} = require("../controllers/willController");

router.post("/create", createWill);
router.get("/all", getWills);
router.delete("/:id", deleteWill);

module.exports = router;
