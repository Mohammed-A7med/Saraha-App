import { Router } from "express";

import endpoints from "./user.endpoint.js";
import * as userService from "./user.service.js";
import * as userSchema from "./user.validation.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthorized from "../../middleware/authorization.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";

const router = Router();

// get user profile
router.get(
  "/profile",
  isAuthenticated,
  isAuthorized(endpoints.profile),
  userService.profile,
);

// update user profile
router.patch(
  "/profile",
  isAuthenticated,
  isAuthorized(endpoints.updateProfile),
  validation(userSchema.updateProfile),
  userService.updateProfile,
);

// update password
router.patch(
  "/password",
  isAuthenticated,
  isAuthorized(endpoints.updatePassword),
  validation(userSchema.updatePassword),
  userService.updatePassword,
);

// deactivate account 
router.delete(
  "/account",
  isAuthenticated,
  isAuthorized(endpoints.deactivateAccount),
  validation(userSchema.deactivateAccount),
  userService.deactivateAccount,
);

export default router;
