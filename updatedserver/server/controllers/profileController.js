import pool from "../models/db.js";  // PostgreSQL connection
import { validationResult } from "express-validator";

// --- CREATE Profile ---
export const createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { user_id, first_name, last_name, date_of_birth, gender, avatar_url, bio, preferences } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO profiles 
        (user_id, first_name, last_name, date_of_birth, gender, avatar_url, bio, preferences) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) 
       RETURNING *`,
      [user_id, first_name, last_name, date_of_birth, gender, avatar_url, bio, preferences]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- READ all profiles ---
export const getProfiles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM profiles ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching profiles:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- READ single profile ---
export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM profiles WHERE id=$1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Profile not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- UPDATE profile ---
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, date_of_birth, gender, avatar_url, bio, preferences } = req.body;

  try {
    const result = await pool.query(
      `UPDATE profiles SET 
        first_name=$1, last_name=$2, date_of_birth=$3, gender=$4, avatar_url=$5, bio=$6, preferences=$7, updated_at=NOW()
       WHERE id=$8 RETURNING *`,
      [first_name, last_name, date_of_birth, gender, avatar_url, bio, preferences, id]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: "Profile not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- DELETE profile ---
export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM profiles WHERE id=$1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Profile not found" });

    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    console.error("Error deleting profile:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
