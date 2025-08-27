// import { Pool } from 'pg';
// import dotenv from 'dotenv';


// dotenv.config();

// const pool = new Pool({
//     user : process.env.DB_USER,
//     host : process.env.DB_HOST,
//     database : process.env.DB_NAME,
//     password : process.env.DB_PASS,
//     DB_PORT : process.env.DB_PORT,

// });

// pool.connect()
//     .then(() => console.log('datbase connected success'))
//     .catch((err) => console.error('❌ Database connection failed:', err.message));

// export default pool;


import pkg from 'pg';
import dotenv from 'dotenv';


dotenv.config();


const { Pool } = pkg;

console.log("🔍 DB URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ✅ Check DB connection on startup
pool.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Optional: Exit the app if DB is critical
  });

export default pool;