import CheckoutType from "../types/checkoutType";

const CheckoutReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CheckoutType.SET_CHECKOUT_PAYMENTAPI:
      return {
        ...state,
        paymentAPI: payload,
      };

    default:
      break;
  }
};

export default CheckoutReducer;
