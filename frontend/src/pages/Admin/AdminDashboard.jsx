import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar, Select, MenuItem, InputLabel, FormControl, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    rating: '',
    description: '',
    image: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [products, setProducts] = useState([]);

  const categories = ['Indoor Plants', 'Outdoor Plants', 'Tools and Equipments', 'Pots and Supplies', 'Seeds and Fertilizers'];
  const ratings = [1, 2, 3, 4, 5];

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products to display in the table
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      setSnackbar({
        open: true,
        message: 'Product deleted successfully!',
        severity: 'success',
      });
      // Remove the deleted product from the list
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error deleting product!',
        severity: 'error',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('category', formData.category);
      formDataObj.append('price', formData.price);
      formDataObj.append('rating', formData.rating);
      formDataObj.append('description', formData.description);
      formDataObj.append('image', formData.image);

      const response = await axios.post('/api/products', formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSnackbar({
        open: true,
        message: 'Product added successfully!',
        severity: 'success',
      });

      // Refresh the product list
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error adding product!',
        severity: 'error',
      });
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Rating</InputLabel>
          <Select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            fullWidth
          >
            {ratings.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <Button type="submit">Add Product</Button>
      </form>

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
      />

      {/* Product Table */}
      <h2>Product List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <Button onClick={() => navigate(`/admin/edit-product/${product._id}`)}>Edit</Button>
                <Button onClick={() => handleDelete(product._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
