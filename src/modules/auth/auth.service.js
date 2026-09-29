import User from "../../DB/models/user.model.js";
import { emailEmitter } from "../../utils/emails/email.event.js";
import { encrtption } from "../../utils/encryption/encryption.js";
import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import { compareHash, generateHash } from "../../utils/hash/hash.js";
import { generateToken, verifyToken } from "../../utils/token/token.js";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password, phone, ...data } = req.body;

  await User.create({
    ...data,
    email,
    password: generateHash({ plainText: password }),
    phone: encrtption({ plainText: phone }),
  });

  // send email
  emailEmitter.emit("sendEmail", email);

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
      new Error("Please activate your account first", { cause: 403 }),
    );

  // check password
  const isPasswordMatch = compareHash({
    plainText: password,
    hashValue: user.password,
  });
  if (!isPasswordMatch)
    return next(new Error("Invalid Password", { cause: 404 }));

  // genrate token
  const token = generateToken({
    payload: {
      id: user._id,
      email: user.email,
      userName: user.userName,
    },
  });

  return res
    .status(200)
    .json({ success: true, message: "User Logged In Successfully!", token });
});

export const activateAccount = asyncHandler(async (req, res, next) => {
  // who are you
  const { token } = req.params;
  const { email } = verifyToken({ token });

  const user = await User.findOne({ email });
  if (!user) return next(new Error("Document not found!", { cause: 400 }));

  // change user status to be is Acctivated true
  user.isActive = true;
  await user.save();

  return res.status(200).json({ success: true, message: "Try to login" });
});
