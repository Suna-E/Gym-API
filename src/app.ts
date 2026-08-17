import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

// Load environment variables from .env
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Gym API is finally fkn running' });
});

const PORT = process.env.PORT || 5000;

// Start server & connect to MongoDB Atlas
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  connectDB();
});

export default app;