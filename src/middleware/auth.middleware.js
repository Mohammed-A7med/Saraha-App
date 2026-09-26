import jwt from "jsonwebtoken";

import User from "../DB/models/user.model.js";

const isAuthenticated = async (req, res, next) => {
  try {
    // who are you
    const { authorization } = req.headers;

    // check if it's Bearer
    if (!authorization || !authorization.startsWith("Bearer"))
      return res
        .status(403)
        .json({ success: false, message: "Token Required!" });

    // extract token
    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id).select("-password").lean();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    //add user to req
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
      error,
    });
  }
};

export default isAuthenticated;
