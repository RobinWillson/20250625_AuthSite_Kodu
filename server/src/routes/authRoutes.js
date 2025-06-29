import express from 'express';
import passport from 'passport';
import { googleCallback, registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Google OAuth authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  googleCallback
);

// Email registration
router.post('/register', registerUser);

// Email login
router.post('/login', loginUser);

// Logout
router.post('/logout', logoutUser);

export default router;