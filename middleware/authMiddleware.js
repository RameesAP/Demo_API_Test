import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const protect = async (req, res, next) => {
    try {
      console.log("Request Headers:", req.headers);
      
      // 1) Get token from headers
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
  
      console.log("Token received:", token);
  
      if (!token) {
        return res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
        });
      }
  
      // 2) Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);
  
      // 3) Check if user still exists
      const currentUser = await User.findById(decoded.id); // ✅ Now it won't throw "User is not defined"
      if (!currentUser) {
        return res.status(401).json({
          message: "The user belonging to this token no longer exists.",
        });
      }
  
      // 4) Attach user and role to request object
      req.user = currentUser;
      req.role = decoded.role; // ✅ Ensure role is attached
  
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired, please log in again." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token, please log in again." });
      }
      console.error("Error in protect middleware:", error); // ✅ Log error for debugging
      res.status(500).json({ message: "Authentication failed" });
    }
  };
  
  export const restrictToAdmin = (req, res, next) => {
    if (req.role !== "admin") {  // ⚠️ req.role is undefined!
      return res.status(403).json({
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };