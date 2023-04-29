import CartType from "../types/cartType";

const CartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CartType.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export default CartReducer;
