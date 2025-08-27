import pool from "../models/db.js";
const bcrypt = require('bcryptjs');

// --- CREATE a new user ---
// Corresponds to: POST /api/users
const createUser = async (req, res) => {
    const { email, phone, password, role, notes } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        
        const referral_code = `${email.split('@')[0]}${Math.floor(1000 + Math.random() * 9000)}`;

        const newUserQuery = `
            INSERT INTO users (email, phone, password_hash, role, notes, referral_code) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id, email, phone, role, status, created_at;
        `;
        
        const newUser = await pool.query(newUserQuery, [email, phone, password_hash, role || 'user', notes, referral_code]);

        res.status(201).json(newUser.rows[0]);

    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') { // PostgreSQL unique violation
            return res.status(409).json({ error: 'A user with this email or phone already exists.' });
        }
        res.status(500).json({ error: 'Server error occurred while creating user.' });
    }
};

// --- READ all users ---
// Corresponds to: GET /api/users
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT id, email, role, status, is_active FROM users ORDER BY created_at DESC');
        res.status(200).json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred while fetching users.' });
    }
};

// --- READ a single user by ID ---
// Corresponds to: GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query('SELECT id, email, phone, role, status, created_at, reward_points, notes FROM users WHERE id = $1', [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred.' });
    }
};

// --- UPDATE a user ---
// Corresponds to: PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, phone, role, status, notes } = req.body;

        const updateUserQuery = `
            UPDATE users 
            SET email = $1, phone = $2, role = $3, status = $4, notes = $5, updated_at = CURRENT_TIMESTAMP 
            WHERE id = $6 
            RETURNING id, email, role, status, updated_at;
        `;
        const updatedUser = await pool.query(updateUserQuery, [email, phone, role, status, notes, id]);

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(updatedUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred while updating user.' });
    }
};

// --- DELETE a user ---
// Corresponds to: DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

        if (deleteUser.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        
        res.status(204).send();

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error occurred while deleting user.' });
    }
};

// Export all controller functions
module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};