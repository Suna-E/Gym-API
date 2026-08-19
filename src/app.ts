import "dotenv/config";
import express from 'express';
import cookieParser from "cookie-parser";
import { connectDB } from './config/db.js';
import  authRouter  from './routes/auth.router';
import { bookingRouter } from "./routes/booking.router";

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('auth/', authRouter);


app.get('/', (req, res) => {
res.json({ message: 'Gym API is finally fkn running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});

export default app;