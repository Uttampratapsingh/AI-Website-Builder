import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import websiteRouter from './routes/website.js';
import billingRouter from './routes/billing.js';
import { stripeWebhook } from './controllers/stripeWebhook.js';


dotenv.config();

await connectDB(); // Connect to the database before starting the server

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL, // Allow requests from the frontend URL
  credentials: true, // Allow cookies to be sent
}));

// Stripe webhook must be before express.json() to receive raw body for signature verification
app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), stripeWebhook);

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/website', websiteRouter);
app.use('/api/billing', billingRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});