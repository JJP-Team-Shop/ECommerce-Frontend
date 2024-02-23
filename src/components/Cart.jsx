import { useState, useEffect } from "react";
import {
  useGetCartItemsQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../api/shopApi";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = () => {
  const { data: cartItems, isLoading, isError } = useGetCartItemsQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  // Optimistically update the local state to handle quantity changes
  const [localCartItems, setLocalCartItems] = useState([]);

  // Synchronize local state with fetched cart items
  useEffect(() => {
    // Initialize local state with fetched cart items
    setLocalCartItems(cartItems || []);
  }, [cartItems]);

  const handleRemoveItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId).unwrap();
      // Immediately reflect the change in the local state
      const updatedItems = localCartItems.filter(
        (item) => item.id !== cartItemId
      );
      setLocalCartItems(updatedItems);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    try {
      await updateCartItem({ id: cartItemId, quantity: newQuantity }).unwrap();
      // Immediately reflect the change in the local state
      const updatedItems = localCartItems.map((item) =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      setLocalCartItems(updatedItems);
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  };

  // Calculate total amount
  const totalAmount = localCartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  if (isLoading) return <div>Loading cart...</div>;
  if (isError) return <div>Error loading cart.</div>;

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", margin: "20px auto", maxWidth: 600 }}
    >
      <Typography
        variant="h4"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <ShoppingCartIcon /> Your Cart
      </Typography>
      <Grid container spacing={2}>
        {localCartItems.length > 0 ? (
          localCartItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Card elevation={2}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <img
                        src={item.product.image}
                        alt={item.product.productName}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxWidth: "100px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6">
                        {item.product.productName}
                      </Typography>
                      <Typography variant="body1">
                        Price: ${item.product.price}
                      </Typography>
                      <Typography variant="body1">Quantity:</Typography>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        InputProps={{
                          inputProps: { min: 1, style: { padding: "5px" } },
                          style: { width: "80px", marginRight: "10px" },
                        }}
                      />
                      <Typography variant="body2">
                        Total: $
                        {parseFloat(item.quantity * item.product.price).toFixed(
                          2
                        )}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">Your cart is empty.</Typography>
        )}
      </Grid>
      <Typography
        variant="h5"
        style={{ marginTop: "20px", textAlign: "right" }}
      >
        Total Amount: ${totalAmount.toFixed(2)}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </Paper>
  );
};

export default Cart;
