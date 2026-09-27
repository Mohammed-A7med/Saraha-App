import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import User from "../../DB/models/user.model.js";
import sendEmails, { emailSubjects } from "../../utils/sendEmails.js";
import { emailTemplate } from "../../utils/generateHTML.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, userName, phone, gender } =
    req.body;

  // check if password and confirmPassword match
  if (password !== confirmPassword)
    return next(new Error("Passwords do not match!", { cause: 400 }));

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
  const link = `http://localhost:3000/auth/activate_account/${token}`;

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
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check user existence
  const user = await User.findOne({ email });
  if (!user) return next(new Error("Invalid Email", { cause: 404 }));

  // check if account is acctive
  if (!user.isActive)
    return next(
      new Error("You must acctive your account first", { cause: 400 }),
    );

  // check password
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch)
    return next(new Error("Invalid Password", { cause: 404 }));

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
});

export const activateAccount = async (req, res, next) => {
  try {
    // who are you
    const { token } = req.params;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email });
    if (!user) return next(new Error("Document not found!", { cause: 400 }));

    // change user status to be is Acctivated true
    user.isActive = true;
    await user.save();

    return res.status(200).json({ success: true, message: "Try to login" });
  } catch (error) {
    return next(error);
  }
};
