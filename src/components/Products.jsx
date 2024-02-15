import { useGetProductsQuery, useCreateCartItemMutation } from "../api/shopApi";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



// const Products = () => {
//     const {data, error, isLoading} = useGetProductsQuery();
//     const [createCartItem] = useCreateCartItemMutation([]);
//     const [productsData, setProductsData] = useState([]);
        
//     useEffect(() => {
//         if (data.products) {
//           setProductsData(data.products);
//         }
//       }, [data]);

//       const handleAddtoCart = async (productId) => {
//         try {
//             await createCartItem({ productId });
//             alert("Product added to Cart successfully!");
//         } catch (error) {
//             alert("Failed to add product to cart");
//         }
//         }
     

//       console.log(data)
//       if (isLoading) {
//           <h2>Page Loading...</h2>
//       }
//       if (error) {
//           alert("Fetch Failed")
//       }

//       return (

//         <div className='products'>
//                 {productsData.map((product) => (
    
//             <div key={product.id} className="product-card">
//               <div className="product-image-container">
//                 <img className="product-image" src={product.image} alt={product.productName} />
//               </div>
    
//             <div className="product-details">
//                 <p>{product.productName}</p> 
//                 <h2>{product.price}</h2>

//                 <Link to ={`/products/${product.id}`}>More Details</Link>
//                 <button onClick={() => handleAddtoCart(product.id)}>Add to Cart</button>
//               </div>
              
//             </div>
//           ))}
//             </div>
//         );
//     };

//     export default Products;
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
    }
    console.log("data:", data);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
      
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
        
        {data.map(product => (
            <div key={product.id}>
                <h1>{product.productName}</h1>
               
                <Link to={`/products/${product.id}`}>View Details</Link>
                <button onClick={() => handleAddtoCart(product.id)}>Add to Cart</button>
            </div>
        ))}
    </div>
    );
}

export default Getallproducts;