import jwt from "jsonwebtoken";

export const generateToken = ({
  payload,
  signauture = process.env.JWT_SECRET,
  options = {},
}) => {
  return jwt.sign(payload, signauture, options);
};

export const verifyToken = ({
  token,
  signauture = process.env.JWT_SECRET,
  options = {},
}) => {
  return jwt.verify(token, signauture, options);
};
