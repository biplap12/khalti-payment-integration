
import React, { useContext, useState, useEffect } from "react";
import { initiatePayment } from "../api/khalti";
import AxiosToastError from "../utils/AxiosErrors";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentPage: React.FC = () => {
  const {
    user,
    isAuthenticated,
    loading: userLoading,
    selectedProduct,
  } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "cod">(
    "wallet",
  );

  const [shipping, setShipping] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = selectedProduct ? selectedProduct.price : 0;
  const shippingCost = 5;
  const total = subtotal + shippingCost;

  /** Fill user data when loaded */
  useEffect(() => {
    if (user) {
      setShipping((prev) => ({
        ...prev,
        name: user.name,
        phone: user.phone,
      }));
    }
  }, [user]);

  /** Redirect if no product */
  useEffect(() => {
    if (!selectedProduct) {
      navigate("/");
    }
  }, [selectedProduct, navigate]);

  if (!selectedProduct) return null;

  /** Proper form validation */
  const isFormValid = (): boolean => {
    return (
      shipping.name.trim() !== "" &&
      shipping.phone.trim() !== "" &&
      shipping.address.trim() !== "" &&
      shipping.city.trim() !== "" &&
      shipping.state.trim() !== ""
    );
  };

  const isDataLoaded = !userLoading && selectedProduct;

  const handlePayment = async () => {
    if (!isDataLoaded) return;

    if (!isAuthenticated) {
      toast.error("You must be logged in to make a payment.");
      return;
    }

    if (!isFormValid()) {
      toast.error("Please complete all shipping fields.");
      return;
    }

    setLoading(true);

    try {
      const data = await initiatePayment(
        selectedProduct.id,
        selectedProduct.price,
        {
          name: user?.name || "Guest User",
          email: user?.email || "test@khalti.com",
          phone: shipping.phone,
        },
      );

      window.location.href = data.payment_url;
    } catch (err: unknown) {
      AxiosToastError(err);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-700">
          Loading user info...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Shipping */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Shipping Address
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500"
              value={shipping.name}
              onChange={(e) =>
                setShipping({ ...shipping, name: e.target.value })
              }
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500"
              value={shipping.phone}
              onChange={(e) =>
                setShipping({ ...shipping, phone: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500"
              value={shipping.address}
              onChange={(e) =>
                setShipping({ ...shipping, address: e.target.value })
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="City"
                className="p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                value={shipping.city}
                onChange={(e) =>
                  setShipping({ ...shipping, city: e.target.value })
                }
              />

              <select
                className="p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                value={shipping.state}
                onChange={(e) =>
                  setShipping({ ...shipping, state: e.target.value })
                }>
                <option value="">Select state</option>
                <option value="Kosi">Koshi</option>
                <option value="Madesh">Madhesh</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Karnali">Karnali</option>
                <option value="Sudurpashchim">Sudurpashchim</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Payment Method
            </h2>

            <div className="flex space-x-3 mb-4">
              <button
                onClick={() => setPaymentMethod("wallet")}
                className={`flex-1 border rounded-md p-3 text-center ${
                  paymentMethod === "wallet"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-gray-200 text-gray-500"
                }`}>
                <img
                  src="https://khaltibyime.khalti.com/wp-content/uploads/2025/07/cropped-Logo-for-Blog-1024x522.png"
                  alt="khalti wallet"
                  className="mx-auto"
                />
              </button>

              <button
                onClick={() => setPaymentMethod("cod")}
                className={`flex-1 border rounded-md p-3 text-center ${
                  paymentMethod === "cod"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-gray-200 text-gray-500"
                }`}>
                <img
                  src="https://png.pngtree.com/png-clipart/20230405/original/pngtree-cash-on-delivery-png-image_9027063.png"
                  alt="cash on delivery"
                  className="mx-auto"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>

          <div className="flex items-center space-x-4">
            <img
              src={selectedProduct.image || "/images/product.jpg"}
              alt={selectedProduct.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <p className="font-medium text-gray-800">
                {selectedProduct.name}
              </p>
              <p className="text-gray-500 text-sm">
                {selectedProduct.description}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs. {shippingCost}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={
              loading || !isDataLoaded || !isAuthenticated || !isFormValid()
            }
            className={`w-full py-3 font-semibold rounded-md shadow transition ${
              loading || !isDataLoaded || !isAuthenticated || !isFormValid()
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}>
            {loading
              ? "Processing..."
              : isAuthenticated
              ? "Place Order"
              : "Login to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
