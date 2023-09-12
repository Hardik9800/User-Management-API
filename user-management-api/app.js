const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Access environment variables
const dbConnectionString = process.env.DB_CONNECTION_STRING;

const app = express();
const port = process.env.PORT || 8000;


// Connect to MongoDB (adjust the database URL as needed)
mongoose.connect(dbConnectionString , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Routes
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
