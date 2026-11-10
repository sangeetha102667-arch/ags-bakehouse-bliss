const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendNewOrderEmail(order) {
  if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.ADMIN_EMAIL
  ) {
    console.log("Email settings missing in .env, skipping email");
    return;
  }

  const text = [
    "A new order has been placed on AGS Bakehouse Bliss.",
    "",
    `Customer: ${order.name}`,
    `Email: ${order.email}`,
    `Phone: ${order.phone}`,
    `Cake: ${order.cakeType}`,
    `Size: ${order.size}`,
    `Message on cake: ${order.message || "-"}`,
    `Delivery date: ${order.deliveryDate}`,
    `Address: ${order.address}`,
    "",
    "Please check the admin dashboard to confirm the order.",
  ].join("\n");

  await transporter.sendMail({
    from: `"AGS Bakehouse Bliss" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New order: ${order.cakeType} (${order.size})`,
    text,
  });
}

module.exports = { sendNewOrderEmail };