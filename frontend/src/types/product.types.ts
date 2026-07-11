export interface Product {
  _id: string;
  name: string;
  price: number; // in NPR
  image?: string;
  description?: string;
  status?: "paid" | "unpaid"; // Optional status field
  stock?: number; // Optional stock field
  quantity?: number; // Optional quantity field
}
