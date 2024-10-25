
"use client";
import { useParams } from 'next/navigation'; 
import Link from 'next/link';
import Navbar from '@/components/navbar/navbar';
import { Button } from '@/components/ui/button';

const products = [
  { id: 1, name: "Product 1", price: "$100", description: "Description for Product 1" },
  { id: 2, name: "Product 2", price: "$200", description: "Description for Product 2" },
  { id: 3, name: "Product 3", price: "$150", description: "Description for Product 3" },
  { id: 4, name: "Product 4", price: "$250", description: "Description for Product 4" },
  { id: 5, name: "Product 5", price: "$300", description: "Description for Product 5" },
  { id: 6, name: "Product 6", price: "$180", description: "Description for Product 6" },
  { id: 7, name: "Product 7", price: "$120", description: "Description for Product 7" },
  { id: 8, name: "Product 8", price: "$220", description: "Description for Product 8" },

];

export default function ProductDetailsPage() {
    const { id } = useParams(); 

    const product = products.find((p) => p.id === parseInt(id as string));
  
    if (!product) {
      return <div>Product not found</div>;
    }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-xl text-gray-700">{product.price}</p>
        <p className="mt-4 text-lg">{product.description}</p>
        <Link href="/product">
          <Button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
