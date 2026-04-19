import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    if (item.type === "rental" && item.rentalStart && item.rentalEnd) {
      const start = new Date(item.rentalStart);
      const end = new Date(item.rentalEnd);
      const days = (end - start) / (1000 * 60 * 60 * 24);
      return sum + (item.rental_price_per_day * days * item.quantity);
    }
    return sum + (item.price * item.quantity);
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ shippingAddress })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setOrderData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderData) {
    return (
      <div className="min-h-screen bg-cream py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-parchment rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4">✓</div>
            <h1 className="text-3xl font-bold mb-4 text-espresso">Order Confirmed!</h1>
            <p className="text-espresso/80 mb-6">Thank you for your order</p>

            <div className="bg-cream p-6 rounded-lg mb-6">
              <p className="text-sm text-espresso/80 mb-2">Order ID</p>
              <p className="text-2xl font-bold text-espresso mb-6">{orderData.orderId}</p>

              <p className="text-sm text-espresso/80 mb-2">Total Amount</p>
              <p className="text-2xl font-bold mb-6">₹{orderData.totalAmount.toFixed(2)}</p>

              <div className="border-t pt-6">
                <p className="text-lg font-semibold mb-4 text-espresso">Bank Transfer Details</p>
                <div className="bg-parchment p-4 rounded border-l-4 border-espresso text-left">
                  <p className="mb-2"><strong>Account Name:</strong> {orderData.bankDetails.account_name}</p>
                  <p className="mb-2"><strong>Account Number:</strong> {orderData.bankDetails.account_number}</p>
                  <p className="mb-2"><strong>Bank Name:</strong> {orderData.bankDetails.bank_name}</p>
                  <p className="text-sm text-espresso/80 mt-4">{orderData.bankDetails.instructions}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link
                to="/account"
                className="bg-espresso text-cream px-6 py-3 rounded-lg hover:bg-mocha"
              >
                View Order
              </Link>
              <Link
                to="/products"
                className="bg-sand text-espresso px-6 py-3 rounded-lg hover:bg-cream"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-espresso">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2 bg-parchment rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6 text-espresso">Shipping Address</h2>
            {error && <div className="text-sienna mb-4 bg-[#f7d7c9] p-3 rounded">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="col-span-2 px-4 py-2 border rounded-lg"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="px-4 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="px-4 py-2 border rounded-lg"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6">
                <textarea
                  name="address"
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="px-4 py-2 border rounded-lg"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="px-4 py-2 border rounded-lg"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code"
                  className="px-4 py-2 border rounded-lg"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-espresso text-cream py-3 rounded-lg font-semibold hover:bg-mocha disabled:bg-sand"
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-parchment rounded-lg shadow p-6 h-fit">
            <h3 className="text-xl font-semibold mb-6 text-espresso">Order Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.type}`} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>
                    ₹{item.type === "rental" 
                      ? (item.rental_price_per_day * Math.ceil((new Date(item.rentalEnd) - new Date(item.rentalStart)) / (1000 * 60 * 60 * 24)) * item.quantity)
                      : (item.price * item.quantity)
                    }
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
