import axios from "axios";
import SummaryApi from "../common/SummeryApi";

export interface InitiatePaymentResponse {
  paymentId: string;
  pidx: string;
  payment_url: string;
}

export interface VerifyPaymentResponse {
  message: string;
  data: {
    status: string;
    pidx: string;
    total_amount: number;
    purchase_order_id: string;
    purchase_order_name: string;
    amount: number;
    mobile: string;
    transaction_id: string;
  };
}

export const initiatePayment = async (
  productId: string,
  amount: number,
  customerInfo: {
    name?: string;
    email?: string;
    phone?: string;
  },
  productDetails?: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[],
) => {
  return (
    await axios.post(
      SummaryApi.khaltiInitiate.url,
      {
        productId,
        amount,
        customer_info: customerInfo,
        product_details: productDetails,
      },
      {
        withCredentials: true,
      },
    )
  ).data;
};

export const verifyPayment = async (pidx: string) => {
  const res = await axios.post<VerifyPaymentResponse>(
    SummaryApi.khaltiVerify.url,
    {
      pidx,
    },
    {
      withCredentials: true,
    },
  );

  return res.data;
};
