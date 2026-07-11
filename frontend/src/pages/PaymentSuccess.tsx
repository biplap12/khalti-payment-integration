import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyPayment, type VerifyPaymentResponse } from "../api/khalti";
import AxiosToastError from "../utils/AxiosErrors";
import poisaToRupees from "../utils/Poisa_to_Rupees";

const PaymentReturn: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<string>("Pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<VerifyPaymentResponse["data"] | null>(
    null,
  );

  useEffect(() => {
    const pidx = searchParams.get("pidx");
    const returnStatus = searchParams.get("status") || "";
    // If user canceled from Khalti
    if (returnStatus.toLowerCase().includes("canceled")) {
      setStatus("Canceled");
      setLoading(false);
      return;
    }

    // If no pidx → cannot verify
    if (!pidx) {
      setStatus("Failed");
      setError("Payment Identifier Missing (pidx not found).");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyPayment(pidx);
        setStatus(res.data.status);
        setDetails(res.data);
        setLoading(false);
      } catch (err: unknown) {
        AxiosToastError(err);
        setError("Payment verification failed. Please contact support.");
        setStatus("Failed");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Payment Status
        </h1>

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-indigo-600">
            <svg
              className="animate-spin h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Verifying Payment...
          </div>
        ) : error ? (
          <p className="text-red-500 font-medium">{error}</p>
        ) : (
          <>
            <p
              className={`font-semibold text-xl mb-4 ${
                status === "Completed"
                  ? "text-green-600"
                  : status === "Canceled"
                    ? "text-orange-500"
                    : "text-red-600"
              }`}>
              {status === "Completed"
                ? "Payment Successful"
                : status === "Canceled"
                  ? "Payment Canceled by User"
                  : "Payment Failed"}
            </p>

            {details && status === "Completed" && (
              <div className="text-left text-sm bg-gray-50 p-4 rounded-lg border">
                <p>
                  <strong>Payment Status:</strong> {status}
                </p>
                <p>
                  <strong>Amount:</strong> Rs{" "}
                  {poisaToRupees(details.total_amount)}
                </p>
                <p>
                  <strong>Purchase Order ID:</strong> {details.pidx}
                </p>

                <p>
                  <strong>Transaction ID:</strong> {details.transaction_id}
                </p>
              </div>
            )}
          </>
        )}

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PaymentReturn;
