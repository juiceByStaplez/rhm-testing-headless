"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { wixClient } from "@/lib/wixClient";

type CartContextType = {
  cartCount: number;
  updateCartCount: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      const count =
        cart.lineItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(count);
    } catch (err: any) {
      if (err?.message?.includes("OWNED_CART_NOT_FOUND")) {
        setCartCount(0);
      } else {
        console.error("Error updating cart count:", err);
      }
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
