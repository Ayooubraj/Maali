const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv'); // Only declare dotenv once
const AdminUser = require('./models/AdminUser'); // Adjust path to your model

// Load environment variables
dotenv.config();

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Create a new admin user
const createAdminUser = async () => {
    try {
        const existingAdmin = await AdminUser.findOne({ email: 'admin@gmail.com' });
        if (existingAdmin) {
            console.log('Admin already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin', 10);
        const admin = new AdminUser({
            email: 'admin@gmail.com',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin user created');
        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
