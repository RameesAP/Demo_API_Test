import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// User registration
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1) Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2) Create new user
    const newUser = await UserModel.create({
      name,
      email,
      password,
      //role: role || "customer", // Default to 'customer' if role is not provided
      role: "customer", // Default to 'customer' if role is not provided
    });

    // 3) Generate JWT token
    const token = signToken(newUser);

    // 4) Remove password from response
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // 2) Find user and include password
    const user = await UserModel.findOne({ email }).select("+password");

    // 3) Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4) Generate JWT token
    const token = signToken(user);

    // 5) Remove password from response
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCurrentUser = async (req, res) => {
  try {
    // The `protect` middleware has already attached the user to `req.user`
    res.status(200).json({
      status: "success",
      user: req.user, // Send user details to the frontend
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};