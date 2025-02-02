const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Connect to database (only once)
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

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
const adminUserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const AdminUser = mongoose.model('AdminUser', adminUserSchema);

// Ensure default admin user is created at startup
const ensureAdminExists = async () => {
    try {
        const existingAdmin = await AdminUser.findOne({ email: 'admin@gmail.com' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            const admin = new AdminUser({ email: 'admin@gmail.com', password: hashedPassword });
            await admin.save();
            console.log('✅ Default admin user created.');
        } else {
            console.log('✅ Admin user already exists.');
        }
    } catch (error) {
        console.error('❌ Error ensuring admin user:', error);
    }
};
ensureAdminExists();

// API Prefix
app.use('/api', (req, res, next) => {
    next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Create a new product
app.post('/products', upload.single('image'), async (req, res) => {
    const { name, category, price } = req.body;
    const image = req.file.path; // Get the path of the uploaded image

    try {
        const newProduct = new Product({ name, category, price, image });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// Update a product
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

// Delete a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

// Admin login route with redirection to /admin
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

        const token = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, redirectTo: '/admin' }); // Return redirect path
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
