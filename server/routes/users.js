const express = require("express");
const User = require("../models/User");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

router.get("/", adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;