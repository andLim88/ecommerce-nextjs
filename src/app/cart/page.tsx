"use client"; 

import Navbar from "@/components/navbar/navbar";
import { useSearchParams } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 

const CartPage = () => {
  const searchParams = useSearchParams();
  const cartItems = searchParams.get("cartItems"); 
  const [parsedCartItems, setParsedCartItems] = useState([]);

  useEffect(() => {
    if (cartItems) {
      try {
        const items = JSON.parse(cartItems); 
        setParsedCartItems(items);
      } catch (error) {
        console.error("Failed to parse cart items:", error);
        setParsedCartItems([]); 
      }
    }
  }, [cartItems]); 


  const totalPrice = parsedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const updateQuantity = (id: number, quantity: number) => {
    setParsedCartItems((prevItems) => 
      prevItems.map((item) => 
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item // Ensure quantity is at least 1
      )
    );
  };


  const removeItem = (id: number) => {
    setParsedCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  const handleCheckout = () => {
 
    const cartItemsToCheckout = JSON.stringify(parsedCartItems);
    window.location.href = `/checkout?cartItems=${encodeURIComponent(cartItemsToCheckout)}`;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Your Cart</h1>
        {parsedCartItems.length === 0 ? (
          <p className="text-xl text-gray-700">Your cart is empty.</p>
        ) : (
          <div className="space-y-4 bg-white shadow-2xl border border-black rounded-md p-3">
            {parsedCartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 border-b border-gray-300 "
              >
               
                <img
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col gap-2 ">
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  <p className="text-lg font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 border border-gray-400 rounded-lg mx-2 p-1"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-red-600 rounded-md p-2 text-white transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
               
              </div>
            ))}
            <div className="flex justify-between p-4 bg-gray-200 border border-gray-400 shadow-md rounded-lg mt-4">
              <h2 className="font-bold text-2xl">Total Price:</h2>
              <p className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleCheckout} 
                className="bg-blue-600 text-white rounded-md p-2"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
