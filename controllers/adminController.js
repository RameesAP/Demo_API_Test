import UserModel from "../models/UserModel.js";

//get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
