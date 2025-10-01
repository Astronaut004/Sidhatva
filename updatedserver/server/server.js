import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import mainRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // your React/Vue/Next frontend URL
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended:  true }));
app.use(cookieParser());

// --- API Routes ---
app.use('/api', mainRouter);
app.use("/uploads", express.static("uploads"));
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