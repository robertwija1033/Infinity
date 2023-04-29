import { createContext, useEffect, useReducer } from "react";
import ProductReducer from "../reducers/productReducer";
import ProductType from "../types/productType";
import axios from "axios";

const ProductContext = createContext({
  products: [],
});

const INITIAL_STATE = {
  products: [],
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);
  const { products } = state;
  const setProducts = (product) => {
    dispatch({ type: ProductType.SET_PRODUCTS, payload: product });
  };
  const value = { products, setProducts };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:8080/products");

      setProducts(response.data);
    };

    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
