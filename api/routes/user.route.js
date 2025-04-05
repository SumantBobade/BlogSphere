import express from 'express';
import { signout, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route for testing the API
router.get('/test', test);

// Route for updating a user with token verification
router.put('/update/:userId', verifyToken, updateUser);
router.post('/signout', signout);

export default router;