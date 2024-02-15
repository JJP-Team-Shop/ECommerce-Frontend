import { useGetProductsQuery, useCreateCartItemMutation } from "../api/shopApi";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledButton from "../design/StyledButton";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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

  return (
    <div className="productscardcontainer">
      {data.map((product) => (
        <Card key={product.id} className="product-card">
          <CardContent>
            <h1>{product.productName}</h1>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Getallproducts;

// <div key={product.id}>
// <h1>{product.productName}</h1>

// <Link to={`/products/${product.id}`}>View Details</Link>
// <button onClick={() => handleAddtoCart(product.id)}>Add to Cart</button>
// </div>
