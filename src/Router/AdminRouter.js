const { adminLogin, saveAdmin, listingUser, updateUser } = require('../Controller/AdminController');

const express = require('express');
const verifyToken = require('../Midlleware/LoginMidlleware');


const AdminRouter = express.Router()
AdminRouter.post('/save', saveAdmin)
AdminRouter.post('/login', adminLogin)
AdminRouter.get('/users', verifyToken, listingUser)
AdminRouter.put('/update/:name', verifyToken, updateUser)

module.exports = AdminRouter;