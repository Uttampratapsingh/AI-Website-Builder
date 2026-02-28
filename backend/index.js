import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';


dotenv.config();

await connectDB(); // Connect to the database before starting the server

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.use('/api/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});