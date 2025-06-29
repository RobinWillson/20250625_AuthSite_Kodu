import User from '../models/User.js';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { generateToken } from '../utils/tokenUtils.js';

// Handle Google OAuth callback
export const googleCallback = (req, res) => {
  // The token is generated by the passport strategy and attached to req.user
  const { token } = req.user;
  // Redirect to a frontend route that can handle the token. Using an env var is best practice.
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  res.redirect(`${clientUrl}/auth/callback?token=${token}`);
};

// Handle user registration
export const registerUser = async (req, res) => {
  try {
    // Normalize email to lowercase at the beginning
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    const { email, password, name } = req.body;

    // --- Start Server-Side Validation ---
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'All fields (email, password, name) are required.' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format. Please provide a valid email.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isAdmin = email === 'robinheck101@gmail.com';
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      isAdmin,
    });

    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token, message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Handle user login
export const loginUser = async (req, res) => {
  try {
    // Normalize email to lowercase at the beginning
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    // Securely check if user exists and has a password (i.e., not a Google-only user)
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Handle user logout
export const logoutUser = (req, res) => {
  // For stateless JWT, the client is responsible for clearing the token.
  res.status(200).json({ message: 'Logout successful. Please clear your token on the client side.' });
};