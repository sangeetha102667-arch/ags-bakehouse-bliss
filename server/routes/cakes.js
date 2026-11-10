const express = require("express");
const Cake = require("../models/Cake");
const adminOnly = require("../middleware/adminOnly");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cakes = await Cake.find().sort({ createdAt: -1 });
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", adminOnly, async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    if (!name || price === undefined || price === "")
      return res.status(400).json({ message: "Name and price are required" });

    const cake = await Cake.create({ name, price, image, description });
    res.status(201).json(cake);
  } catch (err) {
    res.status(400).json({ message: "Could not add cake" });
  }
});

router.patch("/:id", adminOnly, async (req, res) => {
  try {
    const allowed = ["name", "price", "image", "description", "available"];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const cake = await Cake.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: "after",
    });
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json(cake);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", adminOnly, async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json({ message: "Cake deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;