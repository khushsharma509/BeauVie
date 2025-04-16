const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
    
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add the user info to the request object
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authenticateToken;
