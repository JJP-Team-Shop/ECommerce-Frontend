import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./components/Account";
// import AdminDashboard from "./components/AdminDashboard";
import Cart from "./components/Cart";
import LoginForm from "./components/Login";
// import NavBar from "./components/NavBar";
import Products from "./components/Products";
import RegistrationForm from "./components/Register";
import SingleProduct from "./components/SingleProduct";




function App() {
  return <>
  {/* <NavBar/> */}
  <div>
  <Routes>
        <Route path = "/" element = {<Products/>} />

        {/* <Route path = "/products/:productid" element = {<SingleProduct/>} /> */}
        <Route path = "/cart" element = {<Cart/>} />

        <Route path = "/register" element = {<RegistrationForm/>} />
        <Route path = "/Cart" element = {<Cart/>} />
        <Route path = "/login" element = {<LoginForm/>} />
        <Route path = "/account" element = {<Account/>} />
        


  </Routes>

  </div>
  </>;
}

export default App;
