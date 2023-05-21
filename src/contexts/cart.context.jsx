import { createContext, useState } from "react";

export const CartContext = createContext({
  //bool for current state
  isCartOpen: false,
  //set variable that points to function
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
