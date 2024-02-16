import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCartQuery } from "../api/shopApi";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cart, error, isLoading } = useGetCartQuery();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (error) {
      setErrorMessage("Error fetching cart data. Please try again later."); // Set error message
    } else {
      setErrorMessage(null); // Clear error message if no error
    }
  }, [error]);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {isLoading && <p>Loading...</p>}
      {cart && cart.map((item) => (
        <div key={item.id}>
          <h3>{item.productName}</h3>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => dispatch(/* Action to remove item from cart */)}>Remove</button>
        </div>
      ))}
      {!isLoading && !cart && <p>Your cart is empty</p>}
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

// export default Cart;

// App.js
// import React, { useState } from 'react';
// import Product from './Product';
// import Cart from './Cart';

// const App = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const products = [
//     { id: 1, name: 'Product 1', price: 10.99 },
//     { id: 2, name: 'Product 2', price: 20.99 },
//     // Add more products as needed
//   ];

//   const addToCart = (product) => {
//     setCartItems([...cartItems, product]);
//   };

//   return (
//     <div>
//       <h1>React Shopping App</h1>
//       <div>
//         {products.map(product => (
//           <Product key={product.id} product={product} onAddToCart={addToCart} />
//         ))}
//       </div>
//       <Cart cartItems={cartItems} />
//     </div>
//   );
// };

// export default App;
