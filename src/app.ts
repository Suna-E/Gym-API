import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/auth.router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/auth', router);

app.get('/', (req, res) => {
  res.json({ message: 'Gym API is finally fkn running' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
  connectDB();
});

export default app;