import mongoose, { Document, Schema } from "mongoose";
import { IPayment } from "../types/khalti";

const OrderSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    purchase_order_id: { type: String, required: true },
    purchase_order_name: { type: String, required: true },
    amount: { type: Number, required: true },
    pidx: { type: String, required: true, unique: true },
    mobile: { type: String },
    status: {
      type: String,
      enum: [
        "Pending",
        "Completed",
        "Failed",
        "Refunded",
        "Expired",
        "User canceled",
        "Partially refunded",
      ],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPayment>("Order", OrderSchema);

// &txnId=4H7AhoXDJWg5WjrcPT9ixW
// &amount=1000
// &total_amount=1000
// &status=Completed
// &mobile=98XXXXX904
// &tidx=4H7AhoXDJWg5WjrcPT9ixW
// &purchase_order_id=test12
// &purchase_order_name=test
// &transaction_id=4H7AhoXDJWg5WjrcPT9ixW
