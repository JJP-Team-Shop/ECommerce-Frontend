import { useGetProductsQuery, useCreateCartItemMutation, useGetCartsQuery, useUpdateCartItemMutation, useGetCartItemsQuery } from "../api/shopApi";
import {  useState } from "react";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card, Snackbar, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import VirtualizedList from "../design/list";
import { jwtDecode } from "jwt-decode";


const Getallproducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  

  const { data: carts } = useGetCartsQuery();
  // const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [createCartItem] = useCreateCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();
  const {data: cartItems} = useGetCartItemsQuery();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const authTokenFromStorage = localStorage.getItem("authToken");
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const handleAddToCart = async (productId) => {
    
    const authTokenFromStorage = localStorage.getItem("authToken");
    const isLoggedIn = Boolean(authTokenFromStorage);

    if (isLoggedIn) {
      try {
        const decodedToken = jwtDecode(authTokenFromStorage);
        const userId = decodedToken.id;     
        const userCart = carts.find(cart => cart.userId === userId);
        const cartId = userCart ? userCart.id : null;
      
        if (cartItems && cartItems.length > 0) {
          const existingCartItem = cartItems.find(
            (item) => item.productId === productId && item.cartId === cartId
          );
      
          if (existingCartItem) {
            await updateCartItem({ id: existingCartItem.id, quantity: existingCartItem.quantity + 1 }).unwrap();
          }else {
            await createCartItem({ cartId, productId, userId, quantity: 1 }).unwrap();
          }
      
          setSnackbarMessage("Product added to Cart successfully!");
          setOpenSnackbar(true);
        }
      } catch (err) {
        console.error("Failed to add product to cart", err);
        setSnackbarMessage("Failed to add product to cart");
        setOpenSnackbar(true);
      }
    }  
      else {
        setSnackbarMessage("Please login to add items to the cart.")
        setOpenSnackbar(true);
      }

    

  };

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error fetching products: {error.message}</div>;
    }


  const featuredProduct = data[0];
  
  return (

    <div className="product-page-container">
    <div className="list-container">
      <VirtualizedList className="virtualized-list"/>
    </div>
    <div className="products-container">
      
      <div className="featured-product">
        <Card className="featured-card">
          <CardContent>
            <h4>Featured Product Of The Day!</h4>

            <img
              className="product-img"
              src={featuredProduct.image}
              alt={featuredProduct.productName}
            />

            <h4>{"Price: $" + featuredProduct.price}</h4>
            <Link to={`/products/${featuredProduct.id}`}>
              <StyledButton>Product Details</StyledButton>
            </Link>

             <StyledButton onClick={() => handleAddToCart(featuredProduct.id)}>

              Add to Cart
            </StyledButton> 
            
          </CardContent>
        </Card>

      </div>

      
      <div className="product-grid">
        {data.slice(1).map((product) => (
          <Card key={product.id} className="product-card">
            <CardContent>
              <h4>{product.productName}</h4>
              <img
                className="product-img"
                src={product.image}
                alt={product.productName}
              />
               <h4>{"Price: $" + product.price}</h4>
              <Link to={`/products/${product.id}`}>
                <StyledButton>Product Details</StyledButton>
              </Link>
               <StyledButton onClick={() => handleAddToCart(product.id)}>
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
    </div>

    </div>
  );
};

export default Getallproducts;



