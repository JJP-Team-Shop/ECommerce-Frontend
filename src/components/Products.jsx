import {
  useGetProductsQuery,
  useCreateCartItemMutation,
  useCreateCartMutation,
  useGetCartsQuery,
} from "../api/shopApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card, Snackbar, Button } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import VirtualizedList from "../design/list";
import { jwtDecode } from "jwt-decode";

const Getallproducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const [createCart] = useCreateCartMutation();
  const { data: cartsData, isLoading: cartsLoading } = useGetCartsQuery();
  const [createCartItem, { isLoading: isCreatingCartItem }] =
    useCreateCartItemMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Authentication check
  const authToken = localStorage.getItem("authToken");
  const userId = authToken ? jwtDecode(authToken).userId : null; // Ensure your token structure has userId

  useEffect(() => {
    const createNewCartIfNeeded = async () => {
      if (!authToken || cartsLoading) return;

      const userCarts = cartsData.filter((cart) => cart.userId === userId);
      const activeCartExists = userCarts.some(
        (cart) => cart.status === "active"
      );

      if (!activeCartExists) {
        try {
          await createCart({ userId, status: "active", totalAmount: 0.0 });
          console.log("New cart created successfully for user", userId);
        } catch (error) {
          console.error("Failed to create new cart:", error);
        }
      }
    };

    createNewCartIfNeeded();
  }, [authToken, cartsData, cartsLoading, createCart, userId]);

  const handleAddToCart = async (productId) => {
    try {
      if (userId) {
        // Call your createCartItem mutation with the productId
        await createCartItem({ productId, quantity: 1 }).unwrap();
        setSnackbarMessage("Product added to Cart successfully!");
        setOpenSnackbar(true);
      } else {
        // Guest user logic
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const itemIndex = cart.findIndex(
          (item) => item.productId === productId
        );
        if (itemIndex > -1) {
          cart[itemIndex].quantity += 1; // Increment quantity if product exists
        } else {
          cart.push({ productId, quantity: 1 }); // Add new item to cart
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setSnackbarMessage("Product added to Cart successfully!");
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.error("Failed to add product to cart", err);
      setSnackbarMessage("Failed to add product to cart");
      setOpenSnackbar(true);
    }
  };

  if (isLoading || isCreatingCartItem) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching products: {error.message}</div>;
  }

  const featuredProduct = data[0];

  return (
    <div className="product-page-container">
      <div className="list-container">
        <VirtualizedList className="virtualized-list" />
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
              <Button
                color="secondary"
                size="small"
                onClick={handleCloseSnackbar}
              >
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
