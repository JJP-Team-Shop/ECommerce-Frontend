
import React, { useState, useEffect } from "react";
import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../api/shopApi";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const {
    data: cartItems,
    isLoading,
    isError,
    refetch,
  } = useGetCartItemsQuery();
  const [deleteCartItem, { isLoading: isDeleting }] =
    useDeleteCartItemMutation();
  const [updateCartItem, { isLoading: isUpdating }] =
    useUpdateCartItemMutation();

  // Log cartItems to inspect the structure
  useEffect(() => {
    console.log("Fetched cartItems:", cartItems);
  }, [cartItems]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId).unwrap();
      refetch(); // Refetch cart items after successful deletion
      alert("Item removed successfully"); // Consider replacing with a more user-friendly notification
      // Optionally, refetch or update local state to reflect the changes
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      alert("Failed to remove item"); // Consider a more user-friendly error handling
    }
  };


  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    try {

      const updated = await updateCartItem({
        id: cartItemId,
        quantity: newQuantity,
      }).unwrap();
      console.log("Update successful", updated);

      refetch(); // Refresh the cart items list
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      // Add user feedback for error
    }
  };


  if (isLoading) return <div>Loading cart...</div>;
  if (isError) return <div>Error loading cart.</div>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Your Cart
      </Typography>
      {cartItems?.length > 0 ? (
        cartItems.map((item) => (
          <Card key={item.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography variant="h5">{item.product?.productName}</Typography>
              <Typography variant="body1">
                Price: ${item.product.price}
              </Typography>

              <Typography variant="body1">Quantity:</Typography>
              <TextField
                type="number"
                value={item.quantity}

                onChange={(e) =>
                  handleUpdateQuantity(item.id, parseInt(e.target.value))
                }
                inputProps={{ min: 1, style: { width: "50px" } }}
              />
              <IconButton
                onClick={() => handleRemoveItem(item.id)}
                aria-label="delete"
              >

                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}

      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <StyledButton style={{ marginTop: "20px" }}>
          Proceed to Checkout
        </StyledButton>

      </Link>
    </div>
  );
};


export default Cart;

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

