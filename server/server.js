import express from "express"
import dotenv from "dotenv";
import pool from "./models/db.js";
import cors from "cors";
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth',authRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.get('/', async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(5001, ()=> {
    console.log(`running on ${5001}`);
    
})