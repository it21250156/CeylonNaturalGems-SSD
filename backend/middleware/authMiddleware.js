const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/PageAdminLoginModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract the token after "Bearer"
            
            // If the token is undefined, return an error
            if (!token) {
                return res.status(401).json({ message: 'Not authorized, no token' });
            }

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Log the decoded token for debugging
            console.log('Decoded Token:', decoded);

            // Find the admin based on the token and exclude the password field
            req.admin = await Admin.findById(decoded.id).select('-password');

            // If admin is not found, return an error
            if (!req.admin) {
                return res.status(401).json({ message: 'Not authorized, admin not found' });
            }

            // Call the next middleware or route handler
            next();
        } catch (error) {
            console.error(`Authorization error: ${error.message}`);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
});

module.exports = { protect };
