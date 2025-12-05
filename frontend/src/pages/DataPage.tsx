import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { products, type Product } from "../data/products";
import { AuthContext } from "../context/AuthContext";

const DataPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedProduct } = useContext(AuthContext);

  const handleClick = (product: Product) => {
    setSelectedProduct(product);
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Products List</h1>

        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer hover:bg-indigo-50 transition border-b">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">NPR. {item.price}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleClick(item)}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition">
                    Pay Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPage;
