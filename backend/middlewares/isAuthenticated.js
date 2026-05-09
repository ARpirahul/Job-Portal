// import jwt from "jsonwebtoken";

// const isAuthenticated = async(req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if(!token) {
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             })
//         }

//         // use JWT_SECRET for verification
//         const decode = await jwt.verify(token, process.env.JWT_SECRET);
//         if(!decode) {
//             return res.status(401).json({
//                 message: "Invalid token",
//                 success: false
//             })
//         }
//         req.id = decode.userId;
//         next();
//     } catch(error) {
//         console.log("Auth error:", error.message);
//         return res.status(401).json({
//             message: "Authentication failed",
//             success: false
//         })
//     }
// }

// export default isAuthenticated;


// import jwt from "jsonwebtoken";

// const isAuthenticated = async(req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if(!token) {
//             return res.status(401).json({
//                 message: "User not authenticated",
//                 success: false,
//             })
//         }

//         const decode = await jwt.verify(token, process.env.SECRET_KEY); // ✅ Fixed: JWT_SECRET → SECRET_KEY
//         if(!decode) {
//             return res.status(401).json({
//                 message: "Invalid token",
//                 success: false
//             })
//         }
//         req.id = decode.userId;
//         next();
//     } catch(error) {
//         console.log("Auth error:", error.message);
//         return res.status(401).json({
//             message: "Authentication failed",
//             success: false
//         })
//     }
// }

// export default isAuthenticated;



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

        // ✅ Fixed: JWT_SECRET → SECRET_KEY (matches user.controller.js)
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
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