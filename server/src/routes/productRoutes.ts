import express from "express";
import { protect } from "../middleware/auth";
import { getAllProducts } from "../controllers/productController";


const productRouter = express.Router();

productRouter.get("/", protect, getAllProducts);

export default productRouter;
