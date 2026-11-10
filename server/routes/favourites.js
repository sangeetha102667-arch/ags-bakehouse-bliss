const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const Cake = require("../models/Cake");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favourites");
    if (!user) return res.status(401).json({ message: "Please login again" });
    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/:cakeId", auth, async (req, res) => {
  try {
    const { cakeId } = req.params;
    if (!mongoose.isValidObjectId(cakeId))
      return res.status(400).json({ message: "Invalid cake" });

    const cake = await Cake.findById(cakeId);
    if (!cake) return res.status(404).json({ message: "Cake not found" });

    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { favourites: cakeId },
    });
    res.json({ message: "Added to favourites" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:cakeId", auth, async (req, res) => {
  try {
    const { cakeId } = req.params;
    if (!mongoose.isValidObjectId(cakeId))
      return res.status(400).json({ message: "Invalid cake" });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { favourites: cakeId },
    });
    res.json({ message: "Removed from favourites" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;