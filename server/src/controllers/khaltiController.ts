import { Request, Response } from "express";
import { khaltiClient } from "../utils/khaltiClient";
import {
  IKhaltiInitiateRequest,
  IKhaltiInitiateResponse,
  IKhaltiVerifyResponse,
  IPayment,
} from "../types/khalti";
import { config } from "../config/env";
import { generatePurchaseOrderId } from "../utils/generatePurchaseOrderId";
import Orders from "../models/Orders";

/**
 * Initiate Khalti payment
 * POST /api/khalti/initiate
 * Body: { productId: string; amount: number; customer_info?: { name, email, phone } }
 * User must be authenticated (req.user)
 */
export const initiateKhalti = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: "Unauthorized from controllers" });

    const { customer_info, product_details } = req.body;

    if (!product_details || product_details.length === 0)
      return res.status(400).json({ message: "Invalid product or amount" });

    // console.log(amount, customer_info, product_details);

    if (
      !customer_info ||
      !customer_info.name ||
      !customer_info.email ||
      !customer_info.phone
    )
      return res.status(400).json({ message: "Invalid customer info" });

    // Build Khalti request payload
    const totalAmount = product_details.reduce(
      (sum: number, product: any) => sum + product.price * product.quantity,
      0,
    );

    const purchaseOrderId = generatePurchaseOrderId();

    const payload: IKhaltiInitiateRequest = {
      return_url: config.returnUrl,
      website_url: config.websiteUrl,
      amount: parseInt((totalAmount * 100).toFixed(0)), // convert to paisa
      purchase_order_id: purchaseOrderId,
      purchase_order_name:
        product_details.length === 1
          ? product_details[0].name
          : `${product_details.length} items purchase`,

      customer_info,
      product_details: product_details.map((product: any) => ({
        identity: product.productId, // unique identity for the product
        name: product.name,
        total_price: parseInt(
          (product.price * product.quantity * 100).toFixed(0),
        ),
        quantity: parseInt(product.quantity.toString()),
        unit_price: parseInt((product.price * 100).toFixed(0)),
      })),
    };

    const response = await khaltiClient.post<IKhaltiInitiateResponse>(
      "/epayment/initiate/",
      payload,
    );
    const pidx = response.data.pidx;
    if (!pidx)
      return res.status(500).json({ message: "Khalti did not return pidx" });

    // Save payment in DB
    const payment: IPayment = await Orders.create({
      userId: userId,
      purchase_order_id: purchaseOrderId,
      purchase_order_name: product_details
        .map((product: any) => product.name)
        .join(", "),

      amount: totalAmount,
      mobile: customer_info.phone,
      pidx,
      status: "Pending",
    });

    // Return response to frontend
    res.json({
      paymentId: payment._id,
      pidx,
      payment_url: response.data.payment_url,
      amount: parseInt((totalAmount * 100).toFixed(0)),
      purchase_order_id: payment.purchase_order_id,
      expires_in: response.data.expires_in,
      expires_at: new Date(Date.now() + (response.data.expires_in ?? 0) * 1000),
    });
  } catch (err: any) {
    console.error("Khalti initiate error:", err.response?.data || err.message);
    res.status(500).json({ message: "Khalti initiate failed" });
  }
};

/**
 * Verify Khalti payment
 * GET /api/khalti/verify?pidx=xxx
 */
export const verifyKhalti = async (req: Request, res: Response) => {
  try {
    // const pidx = req.query.pidx as string;
    const pidx = req.body.pidx as string;

    if (!pidx) return res.status(400).json({ message: "pidx required" });
    const verifyRes = await khaltiClient.post<IKhaltiVerifyResponse>(
      "/epayment/lookup/",
      { pidx },
    );

    // Update payment status in DB
    const order = await Orders.findOne({ pidx });
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = verifyRes.data.status;
    await order.save();

    res.json({
      status: order.status,
      data: verifyRes.data,
    });
  } catch (err: any) {
    console.error("Khalti verify error:", err.response?.data || err.message);
    res.status(500).json({ message: "Khalti verification failed" });
  }
};
