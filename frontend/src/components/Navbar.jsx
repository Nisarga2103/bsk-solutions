import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-espresso text-cream shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-sand">
          BSK Solutions
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link to="/products" className="hover:text-sand">
            Products
          </Link>
          <Link to="/rentals" className="hover:text-sand">
            Rentals
          </Link>
          <Link to="/services" className="hover:text-sand">
            Services
          </Link>
          <Link to="/contact" className="hover:text-sand">
            Contact
          </Link>

          {user && user.role === "admin" && (
            <Link to="/admin" className="bg-caramel px-3 py-1 rounded hover:bg-[#9a5c35]">
              Admin
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:text-sand">
            🛒 Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-sienna text-cream text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth Links */}
          {user ? (
            <div className="flex gap-3 items-center">
              <Link to="/account" className="hover:text-sand">
                {user.fullname}
              </Link>
              <button
                onClick={logout}
                className="bg-caramel px-3 py-1 rounded hover:bg-[#9a5c35]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="hover:text-sand">
                Login
              </Link>
              <Link to="/register" className="bg-cream text-espresso px-3 py-1 rounded hover:bg-sand">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}