import React, { createContext, useState } from 'react';

// Create context
export const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cart state
  const [userId, setUserId] = useState(null); // User ID state

  return (
    <CartContext.Provider value={{ cart, setCart, userId, setUserId }}>
      {children}
    </CartContext.Provider>
  );
};
