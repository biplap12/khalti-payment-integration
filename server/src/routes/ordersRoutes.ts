import express from "express";
import { protect } from "../middleware/auth";
import getOrders from "../controllers/orderControllers";

const orderRouter = express.Router();

orderRouter.get("/", protect, getOrders);

export default orderRouter;
