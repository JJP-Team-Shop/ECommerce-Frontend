import { useGetProductsQuery, useCreateCartItemMutation } from "../api/shopApi";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import VirtualizedList from "../design/list";

const Getallproducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const [createCartItem] = useCreateCartItemMutation([]);

  const handleAddtoCart = async (productId) => {
    try {
      await createCartItem({ productId });
      alert("Product added to Cart successfully!");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };
  console.log("data:", data);
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
            <Link to={`/products/${featuredProduct.id}`}>
              <StyledButton>Product Details</StyledButton>
            </Link>
            <StyledButton onClick={() => handleAddtoCart(featuredProduct.id)}>
              Add to Cart
            </StyledButton>
            <h4>{"Price: $" + featuredProduct.price}</h4>
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
              <Link to={`/products/${product.id}`}>
                <StyledButton>Product Details</StyledButton>
              </Link>
              <StyledButton onClick={() => handleAddtoCart(product.id)}>
                Add to Cart
              </StyledButton>
              <h4>{"Price: $" + product.price}</h4>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Getallproducts;

