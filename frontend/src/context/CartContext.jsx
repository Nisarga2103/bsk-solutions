import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, type = "purchase", rentalStart = null, rentalEnd = null) => {
    const existing = cartItems.find(item => item.id === product.id && item.type === type);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.type === type
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity, type, rentalStart, rentalEnd }]);
    }
  };

  const removeFromCart = (productId, type = "purchase") => {
    setCartItems(cartItems.filter(item => !(item.id === productId && item.type === type)));
  };

  const updateQuantity = (productId, quantity, type = "purchase") => {
    setCartItems(cartItems.map(item =>
      item.id === productId && item.type === type ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cart: cartItems }}>
      {children}
    </CartContext.Provider>
  );
};