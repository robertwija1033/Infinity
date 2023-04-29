import { createContext, useReducer } from "react";
import CheckoutReducer from "../reducers/checkoutReducer";
import CheckoutType from "../types/checkoutType";

const CheckoutContext = createContext({
  paymentAPI: "",
});

const INITIAL_STATE = {
  paymentAPI: "",
};

export const CheckoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, INITIAL_STATE);
  const { paymentAPI } = state;

  const setPaymentAPI = (API) => {
    dispatch({ type: CheckoutType.SET_CHECKOUT_PAYMENTAPI, payload: API });
  };

  const value = { paymentAPI, setPaymentAPI };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
