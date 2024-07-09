import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from 'colors';

import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        // first user in the users.js js file is marked up as admin user.
        // getting the admin user's id.
        const adminUserID = createdUsers[0]._id;

        // adding the admin user's ID in every product doc as only he can insert new product data in the db.
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUserID };
        });

        await Product.insertMany(sampleProducts);

        // .green.inverse comes from the colors package.
        console.log('Data Imported!'.green.inverse);
        process.exit();

    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}