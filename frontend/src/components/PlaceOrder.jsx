import React from "react";
import { useState } from "react";
import axios from "axios";

function PlaceOrder() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState({
    product_Name: "",
    quantity: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddToCart = () => {
    if (!product.product_Name || !product.quantity || !product.price) {
      alert("Please fill all fields.");
      return;
    }

    setCart([...cart, product]);
    setProduct({ name: "", quantity: "", price: "" });
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty. Please add products to the cart.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/order", {
        products: cart,
      });

      if (response.status === 201) {
        alert("Order placed successfully!");
        setCart([]); 
      } else {
        alert("Failed to place the order.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      alert("There was an error placing the order. Please try again.");
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div>
        <form>
          <div className="flex justify-center gap-x-5">
            <div className="w-full lg:w-1/2">
              <div className="flex justify-start">
                <label
                  className="block font-rockoFLFRegular font-mono font-medium mb-2"
                  htmlFor="name"
                >
                  Product Name
                </label>
              </div>
              <input
                id="name"
                type="text"
                name="product_Name" 
                value={product.product_Name}
                onChange={handleInputChange}
                className="bg-inherit text-black border-b-2 border-black w-full focus:outline-none py-2 px-3"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex justify-start">
                <label
                  className="block font-rockoFLFRegular font-mono font-medium mb-2"
                  htmlFor="quantity"
                >
                  Quantity
                </label>
              </div>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleInputChange}
                className="bg-inherit text-black border-b-2 border-black w-full focus:outline-none py-2 px-3"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="flex justify-start">
                <label
                  className="block font-rockoFLFRegular font-mono font-medium mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
              </div>
              <input
                id="price"
                type="number"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                className="bg-inherit text-black border-b-2 border-black w-full focus:outline-none py-2 px-3"
              />
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-12 w-32 border-2 border-black hover:bg-black hover:text-white font-mono"
            >
              Add to Cart
            </button>
          </div>
        </form>
        <div className="mt-10">
          <h2 className="text-lg font-bold text-center mb-4">Cart</h2>
          {cart.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">
                    Product Name
                  </th>
                  <th className="border border-gray-400 px-4 py-2">Quantity</th>
                  <th className="border border-gray-400 px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
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
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="h-12 w-32 border-2 border-black hover:bg-black hover:text-white font-mono"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
