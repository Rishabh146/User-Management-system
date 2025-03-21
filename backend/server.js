import express from 'express';
import connectDb from './config/db.js';
import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.js'
import morgan from 'morgan'
import cors from 'cors'

const app = express();
dotenv.config();
connectDb();
app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
    allowedHeaders: ['Authorization', 'Content-Type'], // Allow Authorization header
  }));

app.use("/api/v1/auth",authRoutes)
const PORT=8080
app.get('/', (req, res)=> {
    res.send("<h1>app is running</h1>"); // changed from res.end() to res.send() for better compatibility
});
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
