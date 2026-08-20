import "dotenv/config";
import express from 'express';
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "swagger-ui-express";
import { specs } from "./config/swagger";
import { connectDB } from './config/db';
import  authRouter  from './routes/auth.router';
import { bookingRouter } from "./routes/booking.router";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api-docs', swaggerUi.serve, swaggerSpec.setup(specs));
app.use('/auth', authRouter);
app.use('/member', bookingRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Gym API is running' });
});

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

export default app;