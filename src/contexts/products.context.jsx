import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

//initialize context with empty object
export const ProductsContext = createContext({
  //initialize as an empty array
  products: [],
  //function to set prducts
});

//initialize context provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
