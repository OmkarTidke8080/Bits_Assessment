import React, { useState, useEffect } from "react";
import axios from "axios";

function GetTotalRevenue() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/order/getRevenue"
        ); 
        setTotalOrders(response.data.totalOrders); 
        setTotalRevenue(response.data.totalRevenue); 
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };

    fetchTotalRevenue();
  }, []); 

  return (
    <>
      <h1>Total revenue</h1>
      <div className="flex justify-center">
        <div className="flex gap-x-12 mt-10">
          <div className="w-44 h-16 border-2 border-black flex justify-center items-center">
            <div>
              <h2>Total Orders</h2>
              <h1>{totalOrders}</h1> 
            </div>
          </div>
          <div className="w-44 h-16 border-2 border-black flex justify-center items-center">
            <div>
              <h2>Total Revenue</h2>
              <h1>{totalRevenue}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetTotalRevenue;
