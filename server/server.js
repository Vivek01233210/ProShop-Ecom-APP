import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const port = process.env.PORT || 5200;
connectDB();

const app = express();

const corsOptions = {
    // origin: "http://localhost:5173",
    origin: (origin, callback) => {
        // Check if the origin is allowed
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:3000",
            "http://jobifybyvivek.online",
            "http://www.jobifybyvivek.online",
        ];
        const isAllowed = allowedOrigins.includes(origin);
        callback(null, isAllowed ? origin : false);
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());  // body parser
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// if (process.env.NODE_ENV === 'production') {
//     // set static folder
//     app.use(express.static(path.join(__dirname, '/frontend/build')));

//     // any route that is not api will be redirected to index.html
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     })
// } else {
//     app.get('/', (req, res) => {
//         res.send("API is running...!")
//     });
// }

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});