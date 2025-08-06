import express from "express"
import dotenv from "dotenv";
import pool from "./models/db.js";
import cors from "cors";
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';
dotenv.config();

const app = express();

// other imports and setup...

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/products',productRoute);



app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


app.listen(5001, ()=> {
    console.log(`running on ${5001}`);
    
})