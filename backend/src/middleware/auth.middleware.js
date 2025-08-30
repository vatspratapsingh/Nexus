import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Check for token in Authorization header first (for tab-specific auth)
        let token = req.headers.authorization?.replace('Bearer ', '');
        
        // Fallback to cookie if no Authorization header
        if (!token) {
            token = req.cookies.jwt;
        }

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protected middleware", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}