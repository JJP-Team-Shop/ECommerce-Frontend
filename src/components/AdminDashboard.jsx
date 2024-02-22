import { useState, useRef } from 'react';
import { useRegisterUserMutation, useUpdateProductMutation, useDeleteProductMutation, useGetProductsQuery, useRegisterProductMutation } from "../api/shopApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CardActions from '@mui/material/CardActions';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Select } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const AdminDashboard = () => {
  const [addNewUser] = useRegisterUserMutation();
  const { data: productsData } = useGetProductsQuery();  
  const [updateProductMutation] = useUpdateProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();
  const [registerProductMutation] = useRegisterProductMutation();
  const gridApiRef = useRef(null);
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
    description: '',
    price: 0,
    size: '',
    quantity: 0,
    image: '',
  });

  const handleUserRegistrationChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  const handleAddProduct = async () => {
    try {
      const response = await registerProductMutation({
        ...productData,
        price: parseFloat(productData.price),
        quantity: parseInt(productData.quantity),
      });
      if (response.data) {
        console.log("New product:", response.data);
      } else {
        console.error("Product registration failed");
      }
    } catch (error) {
      console.error("Product registration failed:", error);
    }
  };
  
  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUrlChange = (event) => {
    const imageUrl = event.target.value;
    setProductData((prevData) => ({
      ...prevData,
      image: imageUrl,
    }));
  };

  const handleEditCellChange = async (editCellChangeParams) => {
    const { id, field, props } = editCellChangeParams;
    const { value } = props || {};
    try {
      await updateProductMutation({ id, field, value });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteSelectedRows = async () => {
    const selectedRows = gridApiRef.current.getSelectedRows();
    if (!selectedRows.length) return;
    const ids = selectedRows.map((row) => row.id);
    try {
      await deleteProductMutation({ ids });
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  const columns = [
    { field: 'productName', headerName: 'Product Name', width: 180, editable: true },
    { field: 'description', headerName: 'Description', width: 180, editable: true },
    { field: 'size', headerName: 'Size', width: 120, editable: true },
    { field: 'price', headerName: 'Price', type: 'number', width: 120, editable: true },
    { field: 'quantity', headerName: 'Quantity', type: 'number', width: 120, editable: true },
    { field: 'image', headerName: 'Image', width: 120, editable: true },
  ];
  
  const rows = productsData ? productsData.map((product, index) => ({
    id: index + 1,
    productName: product.productName,
    description: product.description,
    size: product.size,
    price: product.price,
    quantity: product.quantity,
    image: product.image
  })) : [];

  // res.status(200).json({ rows });

  return (
    <div className="admin-dashboard">
      <h1>Account Dashboard</h1>
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
                    onChange={(event) => handleUserRegistrationChange(event.target.name, event.target.value)}
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
                    onChange={(event) => handleUserRegistrationChange(event.target.name, event.target.value)}
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
                    onChange={(event) => handleUserRegistrationChange(event.target.name, event.target.value)}
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
                    onChange={(event) => handleUserRegistrationChange(event.target.name, event.target.value)}
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
                    onChange={(event) => handleUserRegistrationChange(event.target.name, event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="isAdmin-label">Admin Role</InputLabel>
                    <Select
                      labelId="isAdmin-label"
                      id="isAdmin"
                      value={formData.isAdmin ? 'true' : 'false'}
                      label="Admin Role"
                      onChange={(e) => handleUserRegistrationChange('isAdmin', e.target.value)}
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
      <div className="product-management">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              {/* Product Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignContent: 'center' }}>
              <TextField
                name="productName"
                label="Product Name"
                value={productData.productName || ''}
                onChange={handleProductChange}
                fullWidth
              />
              <TextField
                name="description"
                label="Product Description"
                value={productData.description || ''}
                onChange={handleProductChange}
                fullWidth
              />
              <TextField
                name="price"
                label="Product Price"
                value={productData.price || ''}
                onChange={handleProductChange}
                fullWidth
              />
              <TextField
                name="size"
                label="Product Size"
                value={productData.size || ''}
                onChange={handleProductChange}
                fullWidth
              />
              <TextField
                name="quantity"
                label="Product Quantity"
                value={productData.quantity || ''}
                onChange={handleProductChange}
                fullWidth
              />
              <TextField
                name="image"
                label="Image"
                value={productData.image || ''}
                onChange={handleImageUrlChange}
                fullWidth
                />
              </div>
            </CardContent>
            {/* Buttons for Product Actions */}
            <CardActions>
              <Button onClick={handleAddProduct} variant="contained" color="primary">
                Add Product
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* DataGrid for Product Management */}
        <Grid item xs={8} style={{ backgroundColor: '#fff', color: '#000', alignItems: 'center' }}>
          <div className='dataGrid'>
          <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            onEditCellChange={handleEditCellChange}
            gridApiRef={gridApiRef}
            ToolbarComponent={GridToolbar}
            customItems={[
              <Button
                key="delete"
                onClick={handleDeleteSelectedRows}
                variant="contained"
                color="error"
              >
                Delete Selected
              </Button>,
            ]}
              />
          </div>
        </Grid>
      </Grid>
    </div>
    </div>
  );
};

export default AdminDashboard;

