import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        // 1. Get custom 'token' header
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not Authorized. Login Again",
            });
        }

        // 2. Verify token using JWT_SECRET
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Verify Admin Credentials
        const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

        // Decoded string ko expected admin credentials se match karein
        if (token_decode !== expectedPayload) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized. Admin access required",
            });
        }

        next();

    } catch (error) {
        console.log("Admin Auth Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default adminAuth;

















//  import jwt from "jsonwebtoken";

// const adminAuth = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     console.log("Authorization:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Token not found",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     if (decoded.role !== "admin") {
//       return res.status(403).json({
//         success: false,
//         message: "Admin access required",
//       });
//     }

//     req.admin = decoded;

//     next();
//   } catch (error) {
//     console.log("JWT ERROR:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default adminAuth;
