import "@stripe/stripe-js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Cart from "./components/Cart/Cart";
import Detail from "./components/Detail/Detail";
import Dashboard from "./components/Dashboard/Dashboard";
import Product from "./components/Product/Product";
import Success from "./components/Success/Success";
import NotFound from "./components/NotFound/NotFound";
import Bag from "./components/Bag/Bag";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Checkout" element={<Checkout />} />
        <Route exact path="/Payment" element={<Payment />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Register/:id" element={<Register />} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/Detail/:id" element={<Detail />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Product" element={<Product />} />
        <Route exact path="/Product/:id" element={<Product />} />
        <Route exact path="/success/:id" element={<Success />} />
        <Route exact path="/Bag" element={<Bag />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
