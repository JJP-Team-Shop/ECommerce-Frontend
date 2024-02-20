import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from '../api/shopApi';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StyledButton from "../design/StyledButton";
import VirtualizedList from "../design/list";
import { useCreateCartItemMutation } from "../api/shopApi";

const GetProduct = () => {
  const { productid } = useParams();
  const { data, error, isLoading } = useGetProductQuery(productid);
  const [createCartItem] = useCreateCartItemMutation([]);

  const handleAddtoCart = async (productId) => {
    try {
      await createCartItem({ productId });
      alert("Product added to Cart successfully!");
    } catch (error) {
      alert("Failed to add product to cart");
    }
  };
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Something went wrong...</h1>;
  }
  if (!data) {
    return <h1>No data available</h1>;
  }
  const singleProduct = data;
  return (
    <div className="product-page-container">
    <div className="list-container">
      <VirtualizedList className="virtualized-list"/>
    </div>
   
      <div className="single-product">
        <Card className="single-card">
          <CardContent>
          
            <h4>{singleProduct.productName}</h4>
            
            <img
              className="single-product-img"
              src={singleProduct.image}
              alt={singleProduct.productName}
            />
             <h4>{"Product Description:" + singleProduct.description}</h4>
            <h4>{"Size: " + singleProduct.size}</h4>
            <h4>{"Price: $" + singleProduct.price}</h4>
        
            <StyledButton onClick={() => handleAddtoCart(singleProduct.id)}>
              Add to Cart
            </StyledButton>
           
          </CardContent>
        </Card>
      </div>
      
      </div>
  );
};

export default GetProduct;
