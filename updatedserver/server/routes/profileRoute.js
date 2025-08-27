import express from "express";
import { body } from "express-validator";
import { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile } from "../controllers/profilesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- Validators ---
const profileValidation = [
  body("user_id").isInt().withMessage("user_id must be an integer"),
  body("gender").optional().isIn(["male", "female", "other", "prefer_not_to_say"]).withMessage("Invalid gender"),
  body("avatar_url").optional().isURL().withMessage("Invalid avatar URL"),
  body("preferences").optional().isObject().withMessage("Preferences must be JSON"),
];

// --- Routes ---
router.post("/", authMiddleware, profileValidation, createProfile);
router.get("/", authMiddleware, getProfiles);
router.get("/:id", authMiddleware, getProfileById);
router.put("/:id", authMiddleware, profileValidation, updateProfile);
router.delete("/:id", authMiddleware, deleteProfile);

export default router;
