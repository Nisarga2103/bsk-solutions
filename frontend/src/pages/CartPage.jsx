import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
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

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-espresso">Shopping Cart</h1>
          <p className="text-espresso/80 mb-6">Your cart is empty</p>
          <Link to="/products" className="bg-espresso text-cream px-6 py-2 rounded-lg hover:bg-mocha">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-espresso">Shopping Cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 bg-parchment rounded-lg shadow p-6">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.type}`} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0 mb-4">
                <div className="h-24 w-24 bg-sand rounded flex-shrink-0 flex items-center justify-center">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-espresso/70">No image</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-espresso">{item.name}</h3>
                  <p className="text-sm text-espresso/80">{item.type === "rental" ? `Rental: ${item.rentalStart} to ${item.rentalEnd}` : "Purchase"}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.type)}
                        className="px-2 py-1 border border-sand rounded bg-cream"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.type)}
                        className="px-2 py-1 border border-sand rounded bg-cream"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.type)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg text-espresso">
                    ₹{item.type === "rental" 
                      ? (item.rental_price_per_day * Math.ceil((new Date(item.rentalEnd) - new Date(item.rentalStart)) / (1000 * 60 * 60 * 24)) * item.quantity)
                      : (item.price * item.quantity)
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-parchment rounded-lg shadow p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4 pb-4 border-b">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹0</span>
              </div>
            </div>
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-espresso text-cream py-3 rounded-lg font-semibold hover:bg-mocha mb-2"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center bg-sand text-espresso py-2 rounded-lg hover:bg-cream"
            >
              Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="w-full text-sienna mt-4 hover:text-espresso"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
