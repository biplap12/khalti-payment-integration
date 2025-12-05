import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  userId?: mongoose.Types.ObjectId;
  productId: string;
  amount: number;
  pidx: string;
  status: "Pending" | "Completed" | "Failed";
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: { name?: string; email?: string; phone?: string };
  return_url: string;
  website_url: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: String, required: true },
    amount: { type: Number, required: true },
    pidx: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPayment>("Payment", paymentSchema);



// &txnId=4H7AhoXDJWg5WjrcPT9ixW
// &amount=1000
// &total_amount=1000
// &status=Completed
// &mobile=98XXXXX904
// &tidx=4H7AhoXDJWg5WjrcPT9ixW
// &purchase_order_id=test12
// &purchase_order_name=test
// &transaction_id=4H7AhoXDJWg5WjrcPT9ixW