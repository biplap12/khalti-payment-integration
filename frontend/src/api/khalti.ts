// import axios from "axios";

// export interface InitiatePaymentResponse {
//   paymentId: string;
//   pidx: string;
//   payment_url: string;
// }

// export interface VerifyPaymentResponse {
//   message: string;
//   status: "Pending" | "Completed" | "Failed";
//   data: { status: string } | null | undefined;
// }

// export const initiatePayment = async (
//   productId: string,
//   amount: number,
//   customerInfo?: { name?: string; email?: string; phone?: string },
// ) => {
//   const res = await axios.post<InitiatePaymentResponse>(
//     "http://localhost:5000/api/khalti/initiate",
//     { productId, amount, customer_info: customerInfo },
//     { withCredentials: true },
//   );
//   return res.data;
// };

// export const verifyPayment = async (pidx: string) => {
//   const res = await axios.get<VerifyPaymentResponse>(
//     `http://localhost:5000/api/khalti/verify?pidx=${pidx}`,
//   );
//   return res.data;
// };

import axios from "axios";

export interface InitiatePaymentResponse {
  paymentId: string;
  pidx: string;
  payment_url: string;
}

export interface VerifyPaymentResponse {
  message: string;
  status: "Pending" | "Completed" | "Failed";
  data: { status: string } | null | undefined;
}

const getToken = () => cookieStore.get("token")?.value;
export const initiatePayment = async (
  productId: string,
  amount: number,
  customerInfo?: { name?: string; email?: string; phone?: string },
) => {
  const res = await axios.post<InitiatePaymentResponse>(
    "http://localhost:5000/api/khalti/initiate",
    { productId, amount, customer_info: customerInfo },
    {
      withCredentials: true, // send cookie if backend uses cookie-based auth
    },
  );
  return res.data;
};

export const verifyPayment = async (pidx: string) => {
  const res = await axios.get<VerifyPaymentResponse>(
    `http://localhost:5000/api/khalti/verify?pidx=${pidx}`,
    {
      withCredentials: true, // important if backend uses cookie auth
      headers: {
        Authorization: `Bearer ${getToken()}`, // JWT header
      },
    },
  );
  return res.data;
};
