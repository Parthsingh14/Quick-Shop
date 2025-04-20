import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  return (
    <div className="p-4 min-h-screen bg-[#F9F5F0]">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover mr-4"
                />
                <span>{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Qty: {item.quantity}</span>
                <span className="text-xl font-bold text-[#714329]">
                  ${item.price * item.quantity}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center">
            <span className="font-semibold text-lg">Total:</span>
            <span className="text-xl font-bold text-[#714329]">
              ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
