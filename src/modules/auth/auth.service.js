import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import User from "../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import { emailEmitter } from "../../utils/emails/email.event.js";

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

  // send email
  emailEmitter.emit("sendEmail", email);

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

export const activateAccount = asyncHandler(async (req, res, next) => {
  // who are you
  const { token } = req.params;
  const { email } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findOne({ email });
  if (!user) return next(new Error("Document not found!", { cause: 400 }));

  // change user status to be is Acctivated true
  user.isActive = true;
  await user.save();

  return res.status(200).json({ success: true, message: "Try to login" });
});
