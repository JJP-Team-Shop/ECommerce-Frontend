import React, { useState, useEffect } from 'react';
import { useGetCartItemsQuery, useDeleteCartItemMutation, useUpdateCartItemMutation } from "../api/shopApi";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card, CardContent, Typography, IconButton, TextField, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
const Cart = () => {
  const { data: cartItems, isLoading, isError, refetch } = useGetCartItemsQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  // Log cartItems to inspect the structure
  useEffect(() => {
    console.log('Fetched cartItems:', cartItems);
  }, [cartItems]);
  const handleRemoveItem = async (cartItemId) => {
    try {
      await deleteCartItem({ id: cartItemId }).unwrap();
      refetch(); // Refresh the cart items list
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      // Add user feedback for error
    }
  };
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }
    try {
      await updateCartItem({ id: cartItemId, quantity: newQuantity }).unwrap();
      refetch(); // Refresh the cart items list
    } catch (error) {
      console.error("Failed to update item quantity:", error);
      // Add user feedback for error
    }
  };
  if (isLoading) return <div>Loading cart...</div>;
  if (isError) return <div>Error loading cart.</div>;
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>Your Cart</Typography>
      {cartItems?.length > 0 ? (
        cartItems.map((item) => (
          <Card key={item.id} style={{ marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h5">{item.product?.productName}</Typography>
              <Typography variant="body1">Price: ${item.product.price}</Typography>
              <Typography variant="body1">Quantity:</Typography>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                inputProps={{ min: 1, style: { width: '50px' } }}
              />
              <IconButton onClick={() => handleRemoveItem(item.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">Your cart is empty.</Typography>
      )}
      <Link to="/checkout" style={{ textDecoration: 'none' }}>
        <StyledButton style={{ marginTop: '20px' }}>Proceed to Checkout</StyledButton>
      </Link>
    </div>
  );
};
export default Cart;


