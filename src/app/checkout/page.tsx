"use client"; 

import { useSearchParams, useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/navbar";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const cartItems = searchParams.get("cartItems");
  const [parsedCartItems, setParsedCartItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "credit_card",
  });
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const router = useRouter(); 

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

  const totalPrice = parsedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

 
    const currentOrder = {
      items: parsedCartItems,
      totalPrice,
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
    };

  
    const existingOrders = localStorage.getItem("orderHistory");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];

 
    orders.push(currentOrder);


    localStorage.setItem("orderHistory", JSON.stringify(orders));


    setIsOrderSuccess(true);
  };

  const closeModal = () => {
    setIsOrderSuccess(false);
    router.push("/product");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>

        {parsedCartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
              <ul className="bg-white p-2 lg:max-w-[1000px] mx-auto border border-black rounded-lg shadow-2xl">
                {parsedCartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center border-b py-4">
                    {/* Product Image */}
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
                <li className="flex justify-between font-bold py-4">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="lg:max-w-[1000px] p-3 mx-auto border border-black rounded-lg shadow-2xl">
                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium mb-2" htmlFor="postalCode">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-medium mb-2">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        paymentMethod: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>

                <Button type="submit" className="bg-blue-600 text-white p-3 rounded-md">
                  Place Order
                </Button>
              </form>
            </div>
          </>
        )}

        {isOrderSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
              <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
              <p className="text-lg mb-4">Thank you for your purchase.</p>
              <Button onClick={closeModal} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
