import express from "express"
import dotenv from "dotenv";
import pool from "./models/db.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());


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