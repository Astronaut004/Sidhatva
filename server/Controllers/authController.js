import pool from "../models/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = 12;

  try {
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashPassword]
    );

    const user = result.rows[0];
    const token = generateToken({ id: user.id, name: user.name });

    res.status(201).json({ user, token });
  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRe = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userRe.rows[0];

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong credentials' });

    const token = generateToken({ id: user.id, name: user.name });

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
};
