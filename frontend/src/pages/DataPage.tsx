import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { Product } from "../types/product.types";

const DataPage: React.FC = () => {
  const navigate = useNavigate();

  const { setSelectedProduct, products, cart, setCart } =
    useContext(AuthContext);

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleClick = (product: Product) => {
    const quantity = quantities[product._id] || 1;

    setSelectedProduct({
      ...product,
      quantity,
    });

    navigate("/payment");
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product._id] || 1;

    const existingItem = cart.find((item) => item._id === product._id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity } : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Products List</h1>

        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Product</th>

              <th className="p-3 text-left">Price</th>

              <th className="p-3 text-left">Stock</th>

              <th className="p-3 text-left">Quantity</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item: Product) => (
              <tr
                key={item._id}
                className="border-b hover:bg-indigo-50 transition">
                <td className="p-3">{item.name}</td>

                <td className="p-3">NPR. {item.price}</td>

                <td className="p-3">{item.stock ?? 0}</td>

                <td className="p-3">
                  <input
                    type="number"
                    min={1}
                    max={item.stock || 1}
                    value={quantities[item._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(item._id, Number(e.target.value))
                    }
                    className="w-24 p-2 border rounded-md"
                  />
                </td>

                <td className="p-3">
                  <button
                    disabled={!item.stock}
                    onClick={() => handleClick(item)}
                    className={`px-4 py-2 rounded-lg text-white ${
                      item.stock
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}>
                    {item.stock ? "Buy Now" : "Out of Stock"}
                  </button>
                </td>

                <td className="p-3">
                  <button
                    disabled={!item.stock}
                    className={`px-4 py-2 rounded-lg text-white ${
                      item.stock
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={() => handleAddToCart(item)}>
                    Add To Cart
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
