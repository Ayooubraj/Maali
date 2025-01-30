const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS configuration - add this before other middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Other Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Connect to MongoDB (replace with your connection string)
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});
const upload = multer({ storage });

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    image: String,
});

const Product = mongoose.model('Product', productSchema);

// Admin User Model
const AdminUser = mongoose.model('AdminUser', new mongoose.Schema({
    email: String,
    password: String,
}));

// Add this line before defining your routes
app.use('/api', (req, res, next) => {
    next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));

app.post('/products', upload.single('image'), async (req, res) => {
    const { name, category, price } = req.body;
    const image = req.file.path; // Get the path of the uploaded image

    const newProduct = new Product({ name, category, price, image });
    await newProduct.save();
    res.status(201).json(newProduct);
});

// Get all products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Update product route
app.put('/products/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, category, price } = req.body;
    const updateData = { name, category, price };

    if (req.file) {
        updateData.image = req.file.path; // Update image if a new one is uploaded
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

// Delete product route
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

// Then define your admin login route with the prefix
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminUser = await AdminUser.findOne({ email });
        if (!adminUser) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, adminUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: adminUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));