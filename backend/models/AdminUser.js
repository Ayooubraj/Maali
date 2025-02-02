const mongoose = require('mongoose');

// AdminUser schema definition
const adminUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Create and export the AdminUser model
const AdminUser = mongoose.model('AdminUser', adminUserSchema);
module.exports = AdminUser;
