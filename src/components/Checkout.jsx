import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Checkout = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    location: "",
  });

  const [step, setStep] = useState("form"); // form, upi, processing, success
  const [upiID, setUpiID] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((val) => val.trim() === "")) return;
    setStep("upi");
  };

  const handleUPISubmit = () => {
    if (upiID.trim() === "") return;
    setStep("processing");

    setTimeout(() => {
      clearCart();
      setStep("success");
    }, 3000);
  };

  const goHome = () => navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F5F0] px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        {step === "form" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#714329]">Enter Delivery Details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                name="address"
                type="text"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                name="location"
                type="text"
                placeholder="City/State"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#714329] text-white py-2 rounded hover:bg-[#5a3926] transition"
              >
                Continue to UPI
              </button>
            </form>
          </>
        )}

        {step === "upi" && (
          <>
            <h2 className="text-xl font-bold mb-4 text-[#714329]">Enter your UPI ID</h2>
            <input
              type="text"
              placeholder="e.g., user@upi"
              value={upiID}
              onChange={(e) => setUpiID(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleUPISubmit}
              className="w-full bg-[#714329] text-white py-2 rounded hover:bg-[#5a3926] transition"
            >
              Confirm Payment
            </button>
          </>
        )}

        {step === "processing" && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-[#714329]">
              Processing Payment...
            </h2>
            <div className="w-12 h-12 border-4 border-[#B9937B] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-500">Please wait while we complete your transaction.</p>
          </>
        )}

        {step === "success" && (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
            <p className="text-gray-700 mb-6">Thank you for your purchase.</p>
            <button
              onClick={goHome}
              className="px-4 py-2 bg-[#714329] text-white rounded hover:bg-[#5a3926] transition"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
