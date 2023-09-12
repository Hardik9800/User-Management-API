const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const authenticateUser = require('../middleware/authenticateUser'); // Import the middleware
const secrets = require('../config/secrets'); // Require the secrets module

// POST /api/users: Create a new user with validation
router.post(
  '/api/users',
  [
    body('username')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('Username is required and must be at least 3 characters'),
    body('email')
      .notEmpty()
      .isEmail()
      .withMessage('Email is required and must be a valid email address'),
    body('password')
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage('Password is required and must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // Create a JWT token for authentication
      //const token = jwt.sign({ userId: newUser._id }, 'your-secret-key');
      const token = jwt.sign({ userId: newUser._id }, secrets.secretKey);

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// GET /api/users: Retrieve a list of all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/users/:id: Retrieve a specific user by their id
router.get('/api/users/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify that the authenticated user matches the requested user
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/users/:id: Update an existing user's information
router.put('/api/users/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify that the authenticated user matches the requested user
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { username, email } = req.body;

    // Update user data using Mongoose's findOneAndUpdate method
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { username, email },
      { new: true } // To get the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// DELETE /api/users/:id: Delete a user by their id
router.delete('/api/users/:id', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.id;

    // Verify that the authenticated user matches the requested user
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete the user using Mongoose's findByIdAndDelete method
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
