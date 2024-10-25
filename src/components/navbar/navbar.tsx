import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


const Navbar = ({ cartItems = [] }) => {

  const router = useRouter(); 
  const goToCart = () => {
    router.push(`/cart?cartItems=${JSON.stringify(cartItems)}`); 
};
 
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center relative">
        <Link href="/" className="text-white text-lg font-bold">
          Ecommerce Store
        </Link>
        <div className="flex items-center">
          <Link href="/product" className="text-gray-300 hover:text-white mx-4">
            Products
          </Link>
          <Button onClick={goToCart} className="text-gray-300 bg-transparent hover:text-white relative flex items-center">
            View Cart
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {cartItems.length}
              </div>
            )}
          </Button>
          <Link href="/order" className="text-gray-300 hover:text-white mx-4">
            Order
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
