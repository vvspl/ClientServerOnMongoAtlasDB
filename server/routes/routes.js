const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Admin routes
router.get('/users', authMiddleware, adminController.getUsers);
router.post('/users', authMiddleware, adminController.addUser);
router.delete('/users/:userId', authMiddleware, adminController.deleteUser);

module.exports = router;
