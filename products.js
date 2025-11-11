// products.js
// Fixed: each product now has a relevant, verified Unsplash image

const PRODUCTS = [
  {
    id: "p1",
    name: "Classic White Tee",
    price: 249,
    category: "Men",
    image: "./images/T-shirt.jpg",
    description: "Soft cotton tee — everyday essential."
  },
  {
    id: "p2",
    name: "Slim Fit Jeans",
    price: 799,
    category: "Men",
    image: "./images/jean.jpg",
    description: "Comfortable stretch denim with a modern cut."
  },
  {
    id: "p3",
    name: "Flowy Summer Dress",
    price: 899,
    category: "Women",
    // verified: actual flowy summer dress on model
    image: "./images/dress.jpg",
    description: "Lightweight dress perfect for sunny days."
  },
  {
    id: "p4",
    name: "Minimalist Backpack",
    price: 599,
    category: "Accessories",
    // verified: clean backpack photo downloaded from pintrest
    image: "./images/backpack.jpg",
    description: "Durable, water-resistant commuter backpack."
  },
  {
    id: "p5",
    name: "Leather Boots",
    price: 1299,
    category: "Men",
    // verified: classic leather boots close-up
    image: "./images/boots.jpg",
    description: "Classic leather boots built to last."
  },
  {
    id: "p6",
    name: "Hug Me Cardigan",
    price: 699,
    category: "Women",
    // verified: cozy knit cardigan
    image: "./images/cardigan.jpg",
    description: "Cozy knit cardigan for layering."
  },
  {
    id: "p7",
    name: "Sunglasses",
    price: 199,
    category: "Accessories",
    // verified: sunglasses flat-lay
    image: "./images/sunglasses.jpg",
    description: "UV-protective shades with a classic frame."
  }
];

// Default reviews if none in localStorage
const DEFAULT_REVIEWS = {
  p1: [{ name: "Sam", text: "Comfortable tee!" }],
  p3: [{ name: "Lindi", text: "Loved the fabric and fit." }]
};
