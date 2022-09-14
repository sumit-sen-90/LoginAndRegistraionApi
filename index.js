require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const AdminRouter = require('./src/Router/AdminRouter');
const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(AdminRouter);

//Connectivity from database
mongoose.connect(process.env.DATABASE_URL);
const DB = mongoose.connection;
DB.on('error', () => {
    console.log(error);
})
DB.once('connected', () => {
    console.log("Database Connection successful")
})

app.listen(port, () => {
    console.log(`Server is running at Port No. ${port}`)
})