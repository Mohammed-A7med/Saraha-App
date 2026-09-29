import User from "../DB/models/user.model.js";
import { verifyToken } from "../utils/token/token.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  // who are you
  const { authorization } = req.headers;

  // check if it's Bearer
  if (!authorization || !authorization.startsWith("Bearer"))
    return next(new Error("Token Required!", { cause: 403 }));

  // extract token
  const token = authorization.split(" ")[1];

  const { id } = verifyToken({ token });

  const user = await User.findById(id).select("-password").lean();
  if (!user) return next(new Error("User not found", { cause: 404 }));

  //add user to req
  req.user = user;
  return next();
});

export default isAuthenticated;
