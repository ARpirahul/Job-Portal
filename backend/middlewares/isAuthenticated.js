import jwt from "jsonwebtoken";

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }

        // Fixed: use JWT_SECRET (same as what we set in Render env vars)
        const decode = await jwt.verify(token, process.env.JWT_SECRET || process.env.SECRET_KEY);
        if(!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }
        req.id = decode.userId;
        next();
    } catch(error) {
        console.log("Auth error:", error.message);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        })
    }
}

export default isAuthenticated;