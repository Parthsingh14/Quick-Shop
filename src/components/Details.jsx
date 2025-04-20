import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loading from "./Loading";
import { productContext } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";
import Recommended from "./Recommended";


function Details() {
  const [products] = useContext(productContext);
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    if (!singleProduct) {
      setSingleProduct(products.find((p) => p.id == id));
    }
  }, [id, products, singleProduct]);

  const handleAddToCart = () => {
    const alreadyInCart = cartItems.find((item) => item.id === singleProduct.id);

    if (!alreadyInCart) {
      addToCart(singleProduct);
      alert(`${singleProduct.title} added to cart.`);
    } else {
      alert("Product already in cart.");
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return singleProduct ? (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#F0E6DD] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-4xl lg:max-w-5xl transition-all duration-300 hover:shadow-xl">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-6 sm:p-8 flex items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#F0E6DD]">
            <div className="relative w-full h-64 md:h-80 lg:h-96">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 md:w-1/2 space-y-4">
            <div className="uppercase tracking-wider text-xs sm:text-sm text-[#B08463] font-semibold">
              {singleProduct.category}
            </div>
            <h1 className="text-xl sm:text-2xl font-medium text-[#714329] leading-tight">
              {singleProduct.title}
            </h1>

            <div className="flex items-center mt-2">
              <div className="text-xl sm:text-2xl font-bold text-[#714329]">
                ${singleProduct.price?.toFixed(2)}
              </div>
              <div className="ml-4 px-2 py-1 bg-[#D0B9A7] text-xs text-white rounded-full">
                In Stock
              </div>
            </div>

            <div className="border-t border-[#E8D9C8] my-4"></div>

            <p className="text-sm sm:text-base text-[#5A4A3A] leading-relaxed">
              {singleProduct.description}
            </p>

            <div className="border-t border-[#E8D9C8] my-4"></div>

            {/* Rating and Reviews */}
            <div className="flex items-center">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-[#B5A192] ml-2">(24 reviews)</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[120px] px-4 py-3 bg-gradient-to-r from-[#714329] to-[#B08463] text-white rounded-lg font-medium hover:from-[#5A3722] hover:to-[#8B6B4A] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 min-w-[120px] px-4 py-3 border-2 border-[#B9937B] text-[#714329] rounded-lg font-medium hover:bg-[#F0E6DD] transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                to={`/edit/${id}`}
                className="px-4 py-2 text-sm border border-[#B5A192] text-[#5A4A3A] rounded-md hover:bg-[#B5A192] hover:text-white transition-colors duration-200"
              >
                Edit Product
              </Link>
              <Link
                to={`/delete/${id}`}
                className="px-4 py-2 text-sm border border-[#D0B9A7] text-[#714329] rounded-md hover:bg-[#D0B9A7] hover:text-white transition-colors duration-200"
              >
                Delete Product
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Recommended currentProductId={singleProduct.id} category={singleProduct.category} />

    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F5F0] to-[#F0E6DD] flex items-center justify-center">
      <Loading />
    </div>
  );
}

export default Details;