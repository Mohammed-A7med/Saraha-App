import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import User from "../../DB/models/user.model.js";
import sendEmails, { emailSubjects } from "../../utils/sendEmails.js";
import { emailTemplate } from "../../utils/generateHTML.js";

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

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    const link = `http://localhost:3000/auth/acctivate_account/${token}`;

    const isEmailSend = await sendEmails({
      to: email,
      subject: emailSubjects.accountActivation,
      html: emailTemplate(link),
    });

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
    const { email, password } = req.body;

    // check user existence
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "Invalid Email" });

    // check password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Password" });

    // genrate token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
      process.env.JWT_SECRET,
    );

    return res
      .status(200)
      .json({ success: true, message: "User Logged In Successfully!", token });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const activateAccount = async (req, res) => {
  try {
    // who are you
    const { token } = req.params;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Document not found!" });

    // change user status to be is Acctivated true
    user.isActive = true;
    await user.save();

    return res.status(200).json({ success: true, message: "Try to login" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};
