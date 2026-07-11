import { Request, Response } from "express";
import Order from "../models/Orders";

 const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const orders = await Order.find({
      userId: userId,
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export default getOrders;