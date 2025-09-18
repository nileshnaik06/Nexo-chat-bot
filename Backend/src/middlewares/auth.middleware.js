const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")



async function authValidator(req, res, next) {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }


        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // Find user in database
        const user = await userModel.findById(decoded.id);

        // Check if user still exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    authValidator
}