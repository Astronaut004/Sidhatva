// userRoutes.js
import express from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from './Controller/userController.js';
import { authenticate, authorize } from "./middleware/authMiddleware.js";
import { validateUserInput } from "./middleware/validateMiddleware.js";

const router = express.Router();

// Public: Create user (signup)
router.post('/', validateUserInput, createUser);

// Protected: Only authenticated users can access
router.get('/', authenticate, authorize("admin"), getAllUsers);
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, authorize("admin", "manager"), updateUser);
router.delete('/:id', authenticate, authorize("admin"), deleteUser);

export default router;
