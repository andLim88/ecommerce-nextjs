"use client"; 

import Navbar from "@/components/navbar/navbar";
import { useEffect, useState } from "react";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orderHistory");
    if (storedOrders) {
      setOrderHistory(JSON.parse(storedOrders));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">Order History</h1>

        {orderHistory.length === 0 ? (
          <p className="text-xl">You have no past orders.</p>
        ) : (
          <div className="space-y-4 lg:max-w-[1200px] mx-auto">
            {orderHistory.map((order, index) => (
              <div
                key={index}
                className="bg-white p-4 border border-black rounded-lg shadow-2xl"
              >
                <h2 className="text-xl font-bold mb-4">Order #{index + 1}</h2>
                <ul>
                  {order.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between items-center border-b py-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="font-bold mt-4">
                  Total Price: ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistoryPage;
