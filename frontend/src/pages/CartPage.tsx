import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, type CartItem } from "../context/AuthContext";

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  const { cart, setCart, products } = useContext(AuthContext);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCart(
      cart.map((item: CartItem) =>
        item._id === id
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCart(cart.filter((item: CartItem) => item._id !== id));
  };

  const subtotal = cart.reduce(
    (total: number, item: CartItem) => total + item.price * (item.quantity || 1),
    0,
  );

  const shipping = 50;

  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Cart Items */}

        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              Your cart is empty
            </div>
          ) : (
            cart.map((item: CartItem) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image || "/images/product.jpg"}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div>
                    <h2 className="font-semibold">{item.name}</h2>

                    <p className="text-gray-500">Rs. {item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, (item.quantity || 1) - 1)
                    }
                    className="px-3 py-1 border rounded">
                    -
                  </button>

                  <span>{item.quantity || 1}</span>

                  <button
                    disabled={(item.quantity || 1) >= item?.stock  }
                    onClick={() =>
                      updateQuantity(item._id, (item.quantity || 1) + 1)
                    }
                    className="px-3 py-1 border rounded">
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="ml-3 text-red-500">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}

        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-xl font-bold mb-5">Order Summary</h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>

            <span>Rs. {subtotal}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>

            <span>Rs. {shipping}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>Rs. {total}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => navigate("/payment")}
            className={`mt-6 w-full py-3 rounded-lg text-white ${
              cart.length ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400"
            }`}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
