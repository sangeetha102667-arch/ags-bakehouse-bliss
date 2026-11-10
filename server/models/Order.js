const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cakeType: { type: String, required: true },
    size: { type: String, required: true },
    message: { type: String, default: "" },
    deliveryDate: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "Pending" },
    paymentMethod: { type: String, enum: ["cod", "bank"], default: "cod" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);