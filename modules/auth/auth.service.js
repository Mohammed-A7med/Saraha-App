import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";

import User from "../../DB/models/user.model.js";

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword, userName, phone, gender } =
      req.body;

    // check if password and confirmPassword match
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match!" });

    // hash pasword
    const hashedPassword = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS),
    );

    // phone encryption
    const encryptedPhone = CryptoJS.AES.encrypt(
      phone,
      process.env.AES_SECRET_KEY,
    ).toString();

    await User.create({
      email,
      password: hashedPassword,
      userName,
      phone: encryptedPhone,
      gender,
    });
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User Logged In Successfully!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};
