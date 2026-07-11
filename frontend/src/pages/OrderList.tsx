import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { Order } from "../data/seedOrders";

const OrderList: React.FC = () => {
  const { orders, loading } = useContext(AuthContext);

  console.log("Orders in OrderList:", orders); // Debugging line

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Amount</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Date</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="p-3 border">{order.purchase_order_id}</td>
                    <td className="p-3 border">{order.purchase_order_name}</td>
                    <td className="p-3 border">Rs. {order.amount}</td>
                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
