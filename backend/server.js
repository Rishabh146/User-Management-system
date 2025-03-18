import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express();
dotenv.config();
// Connect to the database
connectDb();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use("/api/v1/auth",authRoutes)
const PORT=8080

// Define a route with the correct types for Request and Response
app.get('/', (req, res)=> {
    res.send("<h1>app is running</h1>"); // changed from res.end() to res.send() for better compatibility
});

// Listen on port 8080
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});