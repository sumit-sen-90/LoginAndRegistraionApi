const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    }
})
const AdminModel = new mongoose.model('Admin', AdminSchema)
module.exports = AdminModel;