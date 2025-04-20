import { useContext } from "react";
import { productContext } from "../contexts/ProductsContext";
import { Link, useLocation } from "react-router-dom";
import { FiPlus, FiHome, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../contexts/CartContext"; // Importing the useCart hook

function Navbar({ onNavigate }) {
  const [products] = useContext(productContext);
  const { cartItems } = useCart(); // Get cartItems from CartContext
  const location = useLocation();
  const categories = products ? Array.from(new Set(products.map((product) => product.category))) : [];

  // Enhanced color variations
  const categoryColors = [
    "bg-[#714329]", // Deep brown
    "bg-[#B08463]", // Medium brown
    "bg-[#B9937B]", // Warm beige
    "bg-[#D0B9A7]", // Light cream
    "bg-[#5A4A3A]", // Dark brown
  ];

  const getCategoryColor = (index) => {
    return categoryColors[index % categoryColors.length];
  };

  return (
    <nav className="w-full h-full bg-gradient-to-b from-[#714329] to-[#B08463] text-white p-4 md:p-6 flex flex-col">
      {/* Brand Logo */}
      <div className="mb-8 hidden md:block">
        <h1 className="text-2xl font-medium">Quick Shop</h1>
        <p className="text-[#D0B9A7] text-sm mt-1">Elegant Essentials</p>
      </div>

      {/* Main Navigation */}
      <div className="space-y-6 flex-1">

        {/* Add Product Button */}
        <Link
          to="/create"
          onClick={onNavigate}
          className={`flex items-center py-3 px-4 rounded-lg transition-all ${location.pathname === "/create" ? "bg-[#B9937B] text-white shadow-md" : "hover:bg-[#B9937B]/50 text-[#F0E6DD]"}`}
        >
          <FiPlus className="mr-3" />
          <span>Add Product</span>
        </Link>

        
        <div>
            {/* Home Link */}
        <Link
          to="/"
          onClick={onNavigate}
          className={`flex items-center py-3 px-4 rounded-lg transition-all ${location.pathname === "/" ? "bg-[#B9937B] text-white shadow-md" : "hover:bg-[#B9937B]/50 text-[#F0E6DD]"}`}
        >
          <FiHome className="mr-3" />
          <span>Home</span>
        </Link>

        {/* Cart Button */}
        <Link
          to="/cart"
          onClick={onNavigate}
          className={`flex items-center py-3 px-4 rounded-lg transition-all ${location.pathname === "/cart" ? "bg-[#B9937B] text-white shadow-md" : "hover:bg-[#B9937B]/50 text-[#F0E6DD]"}`}
        >
          <FiShoppingCart className="mr-3" />
          <span>Cart</span>
          {/* Cart Item Count */}
          {cartItems.length > 0 && (
            <span className="ml-2 bg-red-600 text-white rounded-full px-2 text-sm">{cartItems.length}</span>
          )}
        </Link>
        </div>

        {/* Category Filter Section */}
        <div className="w-full">
          <h2 className="text-sm uppercase tracking-wider text-[#D0B9A7] mb-4 px-2">Categories</h2>
          <div className="space-y-1">
            {categories.map((item, index) => (
              <Link
                key={index}
                to={`/?category=${item}`}
                onClick={onNavigate}
                className={`flex items-center py-2 px-4 rounded-lg transition-all ${location.search.includes(item) ? "bg-[#B9937B] text-white" : "hover:bg-[#B9937B]/30 text-[#F0E6DD]"}`}
              >
                <span className={`rounded-full mr-3 w-2.5 h-2.5 ${getCategoryColor(index)}`}></span>
                <span className="capitalize">{item}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Area (visible only in sidebar) */}
      <div className="hidden md:block pt-4 mt-auto border-t border-[#B9937B]/30">
        <p className="text-[#D0B9A7] text-xs">© {new Date().getFullYear()} Quick Shop</p>
      </div>
    </nav>
  );
}

export default Navbar;
