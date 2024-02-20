import { useGetProductsQuery, useCreateCartItemMutation, useCreateCartMutation, useDeleteCartMutation, useGetCartsQuery } from "../api/shopApi";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import VirtualizedList from "../design/list";
import { jwtDecode } from "jwt-decode";


const Getallproducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const [createCartItem] = useCreateCartItemMutation([]);
  const [createCart] = useCreateCartMutation();
  const { data: carts } = useGetCartsQuery();
  const [deleteCart] = useDeleteCartMutation();
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
   
    setAuthToken(localStorage.getItem("authToken"));
  }, [localStorage.getItem("authToken")]);

  useEffect(() => {
    const deletePreviousGuestCarts = async () => {
      try {
      
        const previousGuestCarts = carts.filter((cart) => cart.userId === null);
       
       
        await Promise.all(previousGuestCarts.map((cart) => deleteCart(cart.id )));
        
        console.log("Previous guest carts deleted successfully!");
      } catch (error) {
        console.error("Failed to delete previous guest carts:", error);
      }
    };

    deletePreviousGuestCarts();
  }, [carts, deleteCart]);

  useEffect(() => {
    const createNewCart = async () => {
      try {
        let userId = 1;

        if(authToken) {
          const decodedToken = jwtDecode(authToken);
          userId= decodedToken.id;
          console.log(decodedToken.id)
        }
        console.log(userId)
        const status = "active";
        const totalAmount = 0.0;

        await createCart({userId, status, totalAmount});

        console.log("New cart created successfully!", );
       
      } catch (error) {
        console.error("Failed to create new cart:", error);
      }
    };

    createNewCart();
  }, [createCart]);
 
  const handleAddtoCart = async (productId) => {
    try {
      await createCartItem({ productId });
      alert("Product added to Cart successfully!");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
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
            <StyledButton onClick={() => handleAddtoCart(featuredProduct.id)}>
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
              <StyledButton onClick={() => handleAddtoCart(product.id)}>
                Add to Cart
              </StyledButton>
             
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Getallproducts;

