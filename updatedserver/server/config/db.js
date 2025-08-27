import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASS,
    DB_PORT : process.env.DB_PORT,

});

pool.connect()
    .then(() => console.log('datbase connected success'))
    .catch((err) => console.error('❌ Database connection failed:', err.message));

export default pool;