import { createContext, useEffect, useReducer } from "react";
import CartReducer from "../../reducers/cartReducer";
import CartType from "../../types/cartType";
import { addCartItem } from "./addCartItem";
import { subtractCartItem } from "./subtractCartItem";
import { deleteCartItem } from "./deleteCartItem";
import axios from "axios";

const CartContext = createContext({
  cartItems: [],
  addItemToCart: () => {},
  subtractItemToCart: () => {},
  deleteItemToCart: () => {},
  cartTotal: 0,
  totalPrice: 0,
});

const INITIAL_STATE = {
  cartItems: [],
  cartTotal: 0,
  totalPrice: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const { cartItems, cartTotal, totalPrice } = state;
  const setCartItems = (cartItems) => {
    const cartTotal = cartItems.reduce(
      (total, product) => total + product.quantity,
      0
    );

    const totalPrice = cartItems.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );

    dispatch({
      type: CartType.SET_CART_ITEMS,
      payload: {
        cartItems,
        cartTotal,
        totalPrice,
      },
    });
  };
  const addItemToCart = async (productToAdd) => {
    const newCartItems = await addCartItem(cartItems, productToAdd);

    setCartItems(newCartItems);
  };
  const subtractItemToCart = async (productToSubtract) => {
    const newCartItems = await subtractCartItem(cartItems, productToSubtract);
    setCartItems(newCartItems);
  };
  const deleteItemToCart = async (productToDelete) => {
    const newCartItems = await deleteCartItem(cartItems, productToDelete);
    setCartItems(newCartItems);
  };

  useEffect(() => {
    const getCart = async () => {
      const id = localStorage.getItem("id");

      if (id) {
        let items = await axios.post(
          "http://localhost:8080/carts/getCartItems",
          {
            userId: id,
          }
        );

        setCartItems(items.data);
      }
    };

    getCart();
  }, []);

  const value = {
    cartItems,
    addItemToCart,
    subtractItemToCart,
    deleteItemToCart,
    cartTotal,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
