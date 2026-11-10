const express = require("express");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("name rating comment createdAt");
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const rating = Number(req.body.rating);
    const comment = (req.body.comment || "").trim();

    if (!rating || rating < 1 || rating > 5)
      return res.status(400).json({ message: "Please select a rating" });
    if (!comment)
      return res.status(400).json({ message: "Please write a comment" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "Please login again" });

    const feedback = await Feedback.create({
      user: user._id,
      name: user.name,
      rating,
      comment: comment.slice(0, 500),
    });
    res.status(201).json(feedback);
  } catch (err) {
    res.status(500).json({ message: "Could not save feedback" });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const item = await Feedback.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;