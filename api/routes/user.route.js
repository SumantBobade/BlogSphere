import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route for testing the API
router.get('/test', test);

// Route for updating a user with token verification
router.put('/update/:userId', verifyToken, updateUser);

export default router;