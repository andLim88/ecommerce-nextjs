"use client"; 

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Navbar from "@/components/navbar/navbar";
import { useRouter } from "next/navigation"; 


const products = [
  { id: 1, name: "Product 1", price: 100, imageUrl: "../images/product1.jpg" },
  { id: 2, name: "Product 2", price: 200, imageUrl: "/images/product1.jpg" },
  { id: 3, name: "Product 3", price: 150, imageUrl: "/images/product1.jpg" },
  { id: 4, name: "Product 4", price: 250, imageUrl: "/images/product1.jpg" },
  { id: 5, name: "Product 5", price: 300, imageUrl: "/images/product1.jpg" },
  { id: 6, name: "Product 6", price: 180, imageUrl: "/images/product1.jpg" },
  { id: 7, name: "Product 7", price: 120, imageUrl: "/images/product1.jpg" },
  { id: 8, name: "Product 8", price: 220, imageUrl: "/images/product1.jpg" },
];

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cartItems, setCartItems] = useState([]); 
  const router = useRouter(); 

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

 
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
     
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
      
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };


  const goToCart = () => {
    router.push(`/cart?cartItems=${JSON.stringify(cartItems)}`);
  };

  return (
    <div>
      <Navbar cartItems={cartItems} />
      <div className="container mx-auto py-8">
        <div className="flex justify-between mb-5">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Products List</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-1/4 p-2 border-2 border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map((product) => (
            <Card key={product.id} className="p-3 border-2 shadow-3xl border-black rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{product.name}</h2>
              <p className="text-xl text-gray-700 mb-4">${product.price}</p>
              <div className="flex items-center gap-3">
                <Link href={`/product/${product.id}`}>
                  <Button className="bg-blue-600 text-white border-2 border-blue-700 hover:bg-blue-700">
                    View Details
                  </Button>
                </Link>
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-green-600 text-white border-2 border-green-700 hover:bg-green-700"
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="bg-gray-600 text-white border-2 border-gray-700 hover:bg-gray-700 transition duration-300 shadow-md"
          >
            Previous
          </Button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="bg-gray-600 text-white border-2 border-gray-700 hover:bg-gray-700 transition duration-300 shadow-md"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
