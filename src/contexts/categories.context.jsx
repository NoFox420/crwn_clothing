import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

/*import SHOP_DATA from "../shop-data.js";*/

//initialize context with empty object
export const CategoriesContext = createContext({
  //initialize as an empty array
  categoriesMap: {},
  //function to set prducts
});

//initialize context provider
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  //call useEffect once to transfer data collection to firestore
  /*useEffect(() => {
    addCollectionAndDocuments("categories", SHOP_DATA);
  }, []);*/

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
