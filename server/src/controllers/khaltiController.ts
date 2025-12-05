import { Request, Response } from "express";
import { khaltiClient } from "../utils/khaltiClient";
import Payment, { IPayment } from "../models/Payment";
import {
  IKhaltiInitiateRequest,
  IKhaltiInitiateResponse,
  IKhaltiVerifyResponse,
} from "../types/khalti";
import { config } from "../config/env";

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

    const { productId, amount, customer_info } = req.body as {
      productId: string;
      amount: number;
      customer_info: { name: string; email: string; phone: string };
    };
    if (!productId || !amount || amount <= 0)
      return res.status(400).json({ message: "Invalid product or amount" });

    if (
      !customer_info ||
      !customer_info.name ||
      !customer_info.email ||
      !customer_info.phone
    )
      return res.status(400).json({ message: "Invalid customer info" });

    // Build Khalti request payload
    const payload: IKhaltiInitiateRequest = {
      return_url: config.returnUrl,
      website_url: config.websiteUrl,
      amount: Math.round(amount * 100), // convert to paisa
      purchase_order_id: productId,
      purchase_order_name: "Order Payment",
      customer_info,
    };

    const response = await khaltiClient.post<IKhaltiInitiateResponse>(
      "/epayment/initiate/",
      payload,
    );
    const pidx = response.data.pidx;
    if (!pidx)
      return res.status(500).json({ message: "Khalti did not return pidx" });

    // Save payment in DB
    const payment: IPayment = await Payment.create({
      userId,
      productId,
      amount,
      pidx,
      status: "Pending",
    });

    // Return response to frontend
    res.json({
      paymentId: payment._id,
      pidx,
      payment_url: response.data.payment_url,
      amount: payment.amount,
      productId: payment.productId,
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
    const pidx = req.query.pidx as string;
    if (!pidx) return res.status(400).json({ message: "pidx required" });

    const verifyRes = await khaltiClient.post<IKhaltiVerifyResponse>(
      "/epayment/lookup/",
      { pidx },
    );

    // Update payment status in DB
    const payment = await Payment.findOne({ pidx });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (verifyRes.data.status === "Completed") {
      payment.status = "Completed";
    } else {
      payment.status = "Failed";
    }

    await payment.save();

    res.json({
      message: "Payment verified",
      status: payment.status,
      data: verifyRes.data,
    });
  } catch (err: any) {
    console.error("Khalti verify error:", err.response?.data || err.message);
    res.status(500).json({ message: "Khalti verification failed" });
  }
};
