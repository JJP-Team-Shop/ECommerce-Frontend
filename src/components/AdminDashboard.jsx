import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserQuery, useRegisterUserMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "../api/shopApi";
import { setUserInfo } from "../slice/userSlice";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CardActions from '@mui/material/CardActions';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Select } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [addNewUser] = useRegisterUserMutation();
  const [updateProductMutation] = useUpdateProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const { data: productsData, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
  const getToken = () => localStorage.getItem("authToken");
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    password: '',
    isAdmin: true,
  });
  const [productData, setProductData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
  });
  const fetchUserData = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token available");
        return;
      }
      const response = await fetch(`http://localhost:3000/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.error("Failed to fetch user data. Status:", response.status);
        const responseBody = await response.text();
        console.error("Response body:", responseBody);
        return;
      }
      const userData = await response.json();
      // console.log("User data:", userData);
      dispatch(setUserInfo(userData));
      setUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (getToken()) {
      fetchUserData();
    }
  }, []); // Empty dependencies array to run the effect only once
  const handleAddProduct = () => {
    // Logic to add a new product
    console.log('Adding product:', productData);
    // Reset form after adding product
    setProductData({
      productName: '',
      productDescription: '',
      productPrice: '',
    });
  };
  const handleUpdateProduct = () => {
    // Logic to update a product
    console.log('Updating product:', productData);
    // Reset form after updating product
    setProductData({
      productName: '',
      productDescription: '',
      productPrice: '',
    });
  };
  const handleDeleteProduct = () => {
    // Logic to delete a product
    console.log('Deleting product:', productData);
    // Reset form after deleting product
    setProductData({
      productName: '',
      productDescription: '',
      productPrice: '',
    });
  };
  const handleChange = (event) => {
    console.log('handleChange function called');
    if (!event || !event.target) return; // Add a check for event and event.target
    const { name, value } = event.target;
    let mappedValue = value; // Default to the received value
    // Map the string values to boolean
    if (name === 'isAdmin') {
      mappedValue = value === 'True'; // Convert 'True' to true, 'False' to false
      console.log('Value of isAdmin before conversion:', value);
      console.log('Value of isAdmin after conversion:', mappedValue);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: mappedValue,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addNewUser(formData);
      if (response.data) {
        console.log("User registration successful.");
      } else {
        console.error("User registration failed");
      }
    } catch (error) {
      console.error("User registration failed:", error);
    }
  };
  return (
    <div>
      <h1>Account Dashboard</h1>
      {/* User Details */}
      <div>
        <h2>User Details</h2>
        <p>First Name: {userData && userData.firstName}</p>
        <p>Last Name: {userData && userData.lastName}</p>
        <p>Address: {userData && userData.address}</p>
        <p>Email: {userData && userData.email}</p>
        <p>Role: {userData && userData.isAdmin}</p>
      </div>
      {/* User Options */}
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Admin
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel id="isAdmin-label">Admin Role</InputLabel>
    <Select
      labelId="isAdmin-label"
      id="isAdmin"
      value={formData.isAdmin}
      label="Admin Role"
      onChange={(e) => handleChange('isAdmin', e.target.value)}
    >
      <MenuItem value={'true'}>Yes</MenuItem>
      <MenuItem value={'false'}>No</MenuItem>
    </Select>
  </FormControl>
</Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      {/* Product Management */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <TextField
                name="productName"
                label="Product Name"
                value={productData.productName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="description"
                label="Product Description"
                value={productData.description}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="price"
                label="Product Price"
                value={productData.price}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="size"
                label="Product Size"
                value={productData.size}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="quantity"
                label="Product Size"
                value={productData.quantity}
                onChange={handleChange}
                fullWidth
              />
            </CardContent>
            <CardActions>
              <Button onClick={handleAddProduct} variant="contained" color="primary">
                Add Product
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid container spacing={2}>
          {productsLoading ? (
            <p>Loading products...</p>
          ) : productsError ? (
            <p>Error fetching products: {productsError}</p>
          ) : productsData ? (
          productsData.map((product) => (
        <Grid item xs={4} key={product.id}>
          <Card>
          <CardContent>
              <TextField
                name="productName"
                label="Product Name"
                value={productData.productName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="description"
                label="Product Description"
                value={productData.description}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="price"
                label="Product Price"
                value={productData.price}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="size"
                label="Product Size"
                value={productData.size}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="quantity"
                label="Product Size"
                value={productData.quantity}
                onChange={handleChange}
                fullWidth
              />
            </CardContent>
            {/* <CardContent>
              <Typography variant="h5">Name: {product.productName}</Typography>
              <Typography variant="body1">Description: {product.description}</Typography>
              <Typography variant="body1">Size: {product.size}</Typography>
              <Typography variant="body1">Price: ${product.price}</Typography>
              <Typography variant="body1">Quantity: {product.quantity}</Typography>
              <Typography variant="body1">{product.image}</Typography>
            </CardContent> */}
            <CardActions>
            <Button onClick={handleUpdateProduct} variant="contained" color="primary">
                Update Product
              </Button>
              <Button onClick={handleDeleteProduct} variant="contained" color="error">
                Delete Product
              </Button>
            </CardActions>
          </Card>
        </Grid>
  ))
  ) : (
    <p>No products available.</p>
  )}
</Grid>
      </Grid>
    </div>
  );
};
export default AdminDashboard;