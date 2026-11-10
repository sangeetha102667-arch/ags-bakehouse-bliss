require("dotenv").config();
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");
const Cake = require("../models/Cake");

const cakes = [
  { name: "Black Forest Cake", price: 2000, image: "/images/c4.jpg", description: "A chocolate sponge cake layered with whipped cream and cherries, topped with chocolate shavings.", featured: true },
  { name: "Classic Cheesecake", price: 2500, image: "/images/c5.jpg", description: "Creamy baked dessert with a buttery biscuit crust and smooth cheese filling.", featured: true },
  { name: "Biscuit Cheesecake", price: 2800, image: "/images/c8.jpg", description: "A no-bake cheesecake made with crushed biscuits in the crust and creamy layers.", featured: true },
  { name: "Chocolate Biscuit Cake", price: 2800, image: "/images/c7.jpg", description: "A dense, no-bake dessert combining crushed biscuits and chocolate mixture.", featured: true },
  { name: "Chocolate Blueberry Cake", price: 2000, image: "/images/c12.jpg", description: "Rich chocolate cake layered with blueberry compote and frosting.", featured: true },
  { name: "Wedding Cake", price: 5000, image: "/images/c13.jpg", description: "Multi-tiered cake, elegantly decorated, often customized with flavors and themes.", featured: true },
  { name: "Birthday Cake", price: 4000, image: "/images/c14.jpg", description: "Festive cake, typically vibrant and decorated with candles and celebratory designs.", featured: true },
  { name: "Chocolate Strawberry Cake", price: 3500, image: "/images/c11.jpg", description: "Chocolate cake layered with fresh strawberries and chocolate frosting.", featured: true },
  { name: "Honey Cake", price: 2500, image: "/images/c25.jpg", description: "Moist cake sweetened with honey, often with caramel or nut accents.", featured: true },
  { name: "Red Velvet Cake", price: 3500, image: "/images/c24.jpg", description: "Soft red-hued cake with subtle cocoa flavor and cream cheese frosting.", featured: true },
  { name: "Fondant Cake", price: 2500, image: "/images/c15.jpg", description: "Elegant cake covered with smooth fondant, perfect for detailed designs.", featured: true },
  { name: "Chocolate Blueberry Cake", price: 3500, image: "/images/c16.jpg", description: "Rich chocolate paired with tangy blueberry layers." },
  { name: "Chocolate Vanilla Cake", price: 1500, image: "/images/c9.jpg", description: "Classic combination of chocolate and vanilla flavors." },
  { name: "Chocolate Grapes Cake", price: 3000, image: "/images/c11.jpg", description: "Unique blend of chocolate and fresh grapes." },
  { name: "Vanilla Strawberry Cake", price: 2800, image: "/images/c17.jpg", description: "Soft vanilla sponge with fresh strawberry frosting." },
  { name: "Chocolate Strawberry Cake", price: 2500, image: "/images/c18.jpg", description: "Decadent chocolate cake with strawberry toppings." },
  { name: "Chocolate Blueberry Milk Cake", price: 3200, image: "/images/c19.jpg", description: "Moist chocolate cake infused with blueberry milk flavor." },
  { name: "Vanilla Cake", price: 1500, image: "/images/c10.jpg", description: "Simple and fluffy vanilla cake for all occasions." },
  { name: "Cherry Cake", price: 3500, image: "/images/c20.jpg", description: "Delightful cake with cherries in every bite.", featured: true },
  { name: "Vanilla Wedding Cake", price: 3800, image: "/images/c21.jpg", description: "Elegant multi-tiered vanilla cake for weddings." },
  { name: "Anniversary Cake", price: 4000, image: "/images/c22.jpg", description: "Specially designed cake to celebrate love and milestones." },
  { name: "Mango Cake", price: 2500, image: "/images/c23.jpg", description: "Tropical mango-flavored delight with fresh mango layers." },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const force = process.argv.includes("--force");
  const count = await Cake.countDocuments();

  if (count > 0 && !force) {
    console.log(`Cakes already exist (${count}). Run with --force to replace them.`);
  } else {
    if (force) await Cake.deleteMany({});
    await Cake.insertMany(cakes);
    console.log(`Added ${cakes.length} cakes.`);
  }
  await mongoose.disconnect();
}

run().catch((err) => {
  console.log("Seed error:", err.message);
  process.exit(1);
});