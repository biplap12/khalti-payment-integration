export interface Product {
  id: string;
  name: string;
  price: number; // in NPR
  image?: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: "prod01",
    name: "T-Shirt",
    price: 500,
    image:
      "https://www.greatestbakery.in/wp-content/uploads/2022/03/Buy-Butter-Salt-Biscuit-in-Nagercoil.jpg",
    description: "A cool t-shirt",
  },
  { id: "prod02", name: "Mug", price: 250, description: "Ceramic coffee mug" },
  { id: "prod03", name: "Cap", price: 300, description: "Stylish summer cap" },
  {
    id: "prod04",
    name: "Bag",
    price: 400,
    description: "Lightweight backpack",
  },
  {
    id: "prod05",
    name: "Shoes",
    price: 1000,
    description: "Casual walking shoes",
  },
  { id: "prod06", name: "Shoes1", price: 1000, description: "Sport shoes" },

  // New Products
  {
    id: "prod07",
    name: "Hoodie",
    price: 1200,
    image: "https://i.ibb.co/6mH7X5k/hoodie.jpg",
    description: "Comfortable winter hoodie",
  },
  {
    id: "prod08",
    name: "Notebook",
    price: 150,
    image: "https://i.ibb.co/2g9Gv6X/notebook.jpg",
    description: "A5 premium notebook",
  },
  {
    id: "prod09",
    name: "Water Bottle",
    price: 350,
    image: "https://i.ibb.co/2W1cr4x/bottle.jpg",
    description: "1L steel water bottle",
  },
  {
    id: "prod10",
    name: "Keychain",
    price: 80,
    image: "https://i.ibb.co/J5p9sCg/keychain.jpg",
    description: "Metal keychain",
  },
  {
    id: "prod11",
    name: "Sweatshirt",
    price: 900,
    image: "https://i.ibb.co/qDF7t7J/sweatshirt.jpg",
    description: "Soft cotton sweatshirt",
  },
  {
    id: "prod12",
    name: "Sunglasses",
    price: 700,
    image: "https://i.ibb.co/cNfQwSy/sunglasses.jpg",
    description: "UV-protected sunglasses",
  },
  {
    id: "prod13",
    name: "Laptop Skin",
    price: 350,
    image: "https://i.ibb.co/RC9JpbL/laptop-skin.jpg",
    description: "Durable vinyl laptop skin",
  },
  {
    id: "prod14",
    name: "Phone Cover",
    price: 250,
    image: "https://i.ibb.co/MszMtwC/phone-cover.jpg",
    description: "Shockproof phone back cover",
  },
  {
    id: "prod15",
    name: "Stickers Pack",
    price: 120,
    image: "https://i.ibb.co/wK1DHkt/stickers.jpg",
    description: "Premium waterproof stickers",
  },
];
