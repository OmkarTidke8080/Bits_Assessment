import React, { useState } from "react";
import axios from "axios";

function SearchOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false); 

  const handleSearch = async (e) => {
    e.preventDefault(); 
    setError(""); 

    try {
      const response = await axios.get(
        `http://localhost:3000/api/order/getSingleOrder/${orderId}`
      ); // Adjust endpoint
      setOrderDetails(response.data);
      console.log(response.data);
      setShowOrderDetails(true); 
    } catch (err) {
      setOrderDetails(null);
      setShowOrderDetails(false); 
      setError("Order not found. Please check the Order ID.");
    }
  };

  return (
    <div className="flex justify-center">
      <div>
        {/* Search Input */}
        {!showOrderDetails && (
          <form onSubmit={handleSearch}>
            <div className="flex gap-x-10">
              <div>
                <input
                  type="text"
                  placeholder="Search Order by ID"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-72 h-12 border-2 border-black px-3"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="h-12 w-32 border-2 border-black hover:bg-black hover:text-white font-mono"
                >
                  Search Order
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        )}

        {/* Order Details */}
        {showOrderDetails && orderDetails && (
          <div className="mt-20">
            <h1 className="text-lg font-bold mb-5">Order Details</h1>
            {orderDetails.products && orderDetails.products.length > 0 ? (
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">
                      Product Name
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Quantity
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.products.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.product_Name}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products found in this order.</p> 
            )}
            <div className="mt-5">
              <button
                onClick={() => setShowOrderDetails(false)} 
                className="h-12 w-40 border-2 border-black hover:bg-black hover:text-white font-mono"
              >
                Back to Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOrder;
