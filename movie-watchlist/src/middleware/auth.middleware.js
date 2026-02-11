import {verifyJWTToken} from "../utils/auth.utils.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies['jwt-token'];

    // Check if both token sources are missing or invalid
    if ((!authHeader || !authHeader.startsWith("Bearer ")) && !cookieToken) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    try {
        // Prefer cookie token, fallback to header token
        const token = cookieToken || authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const { userId } = verifyJWTToken(token);
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}