const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets'); // Require the secrets module

function authenticateUser(req, res, next) {
  // Get the token from the Authorization header
  //const token = req.header('Authorization');
  const token = req.headers.authorization.split(' ')[1];


  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Log the incoming token for debugging purposes
    console.log('Incoming Token:', token);

    // Verify the token using your secret key
    const decoded = jwt.verify(token, secrets.secretKey);

    // Log the decoded token payload for analysis
    console.log('Decoded Token Payload:', decoded);

    // Attach the user's ID from the token to the request object for use in route handlers
    req.userId = decoded.userId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Token Verification Error:', error);

    // Handle token verification errors (e.g., token expired or invalid)
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateUser;
