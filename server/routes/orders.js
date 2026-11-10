const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const { sendNewOrderEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let userId;
    const header = req.headers.authorization || "";
    if (header.startsWith("Bearer ")) {
      try {
        userId = jwt.verify(header.slice(7), process.env.JWT_SECRET).id;
      } catch {
        userId = undefined;
      }
    }

    const { name, email, phone, cakeType, size, message, deliveryDate, address } = req.body;
    const order = await Order.create({
      user: userId,
      name,
      email,
      phone,
      cakeType,
      size,
      message,
      deliveryDate,
      address,
    });

    // Email fail aanaalum order fail aagakoodaadhu
    sendNewOrderEmail(order).catch((err) =>
      console.log("Email error:", err.message)
    );

    res.status(201).json({ message: "Order placed", orderId: order._id });
  } catch (err) {
    res.status(400).json({ message: "Could not place order" });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["Pending", "Confirmed", "Delivered", "Cancelled"];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id/payment", async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    if (!["cod", "bank"].includes(paymentMethod))
      return res.status(400).json({ message: "Invalid payment method" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentMethod },
      { returnDocument: "after" }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;