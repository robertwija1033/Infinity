import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductProvider } from "./context/actions/productContext";
import { UserProvider } from "./context/actions/userContext";
import { CartProvider } from "./context/actions/cart/cartContext";
import { CheckoutProvider } from "./context/actions/checkoutContext";
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <UserProvider>
    <ProductProvider>
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
      </CartProvider>
    </ProductProvider>
  </UserProvider>,
  document.getElementById("root")
);
