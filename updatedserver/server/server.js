import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './models/index.js'; // Note the required .js extension
import mainRouter from './routes/index.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api', mainRouter);

// --- Global Error Handler ---
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// --- Start Server and Connect to Database ---
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});