import dotenv from 'dotenv';
dotenv.config(); // 必須在最頂部初始化環境變數

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from './src/utils/passport.js';
import authRoutes from './src/routes/authRoutes.js';
import { authMiddleware } from './src/middleware/authMiddleware.js';
import User from './src/models/User.js'; // 導入User模型
import './src/utils/db.js'; // 確保資料庫連接模塊被加載

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// 根路由 - 服務狀態檢查
app.get('/', (req, res) => {
  res.send('Authentication service is running');
});

// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/users/me', authMiddleware, (req, res) => {
  res.json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    isAdmin: req.user.isAdmin
  });
});

// Admin protected route example
app.get('/api/admin/users', authMiddleware, (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// 異步連接數據庫並啟動服務器
const startServer = async () => {
  try {
    // 從環境變數獲取MongoDB連接字符串
    const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

    if (!MONGODB_URI) {
      throw new Error('MongoDB connection string is missing in environment variables');
    }

    // 連接MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ MongoDB connected successfully');

    // 啟動Express服務器
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1); // 退出進程
  }
};

// 啟動服務
startServer();