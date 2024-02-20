import React, { useState } from "react";
import { useGetProductsQuery, useCreateCartItemMutation } from "../api/shopApi";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card, CardContent, Typography, Button, Snackbar } from "@mui/material";

const Getallproducts = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const [
    createCartItem,
    { isLoading: isCreatingCartItem, error: createCartItemError },
  ] = useCreateCartItemMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // This function or a similar one needs to be defined based on your auth setup
const isUserLoggedIn = () => {
  return Boolean(localStorage.getItem('authToken')); // Assuming 'authToken' is stored in localStorage upon login
};

const handleAddToCart = async (productId) => {
  if (isUserLoggedIn()) {
    try {
      // Call your createCartItem mutation with the productId
      await createCartItem({ productId, quantity: 1 }).unwrap();
      setSnackbarMessage("Product added to Cart successfully!");
      setOpenSnackbar(true);
    } catch (err) {
      console.error("Failed to add product to cart", err);
      setSnackbarMessage("Failed to add product to cart");
      setOpenSnackbar(true);
    }
  } else {
    // Guest user logic
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.productId === productId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity += 1; // Increment quantity if product exists
    } else {
      cart.push({ productId, quantity: 1 }); // Add new item to cart
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setSnackbarMessage("Product added to Cart successfully!");
    setOpenSnackbar(true);
  }
};

  if (isLoading || isCreatingCartItem) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching products: {error.message}</div>;
  }

  return (
    <div className="productscardcontainer">
      {products?.map((product) => (
        <Card key={product.id} className="product-card">
          <CardContent>
            <Typography variant="h5">{product.productName}</Typography>
            <img
              className="product-img"
              src={product.image}
              alt={product.productName}
            />
            <Link to={`/products/${product.id}`}>
              <StyledButton component="span">Product Details</StyledButton>
            </Link>
            <StyledButton
              onClick={() => handleAddToCart(product.id)}
              disabled={isCreatingCartItem}
            >
              Add to Cart
            </StyledButton>
          </CardContent>
        </Card>
      ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            UNDO
          </Button>
        }
      />
    </div>
  );
};

export default Getallproducts;
