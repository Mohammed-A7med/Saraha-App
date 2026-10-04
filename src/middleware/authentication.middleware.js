import User from "../DB/models/user.model.js";
import { asyncHandler } from "../utils/errorHandling/asyncHandler.js";
import { verifyToken } from "../utils/token/token.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  // who are you
  const { authorization } = req.headers;

  // check token existance
  if (!authorization) return next(new Error("Token Required!", { cause: 401 }));

  // check if it's Bearer
  if (!authorization.startsWith("Bearer"))
    return next(new Error("Invalid Token!", { cause: 403 }));

  // extract token
  const token = authorization.split(" ")[1];

  const { id } = verifyToken({ token });

  // check user
  const user = await User.findById(id).select("-password").lean();
  if (!user) return next(new Error("User not found", { cause: 404 }));

  // check for isLoggedIn
  if (!user.isLoggedIn) return next(new Error("Login First", { cause: 404 }));

  //add user to req
  req.user = user;
  return next();
});

export default isAuthenticated;
