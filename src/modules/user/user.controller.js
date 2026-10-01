import { Router } from "express";

import isAuthenticated from "../../middleware/authentication.middleware.js";
import isAuthorized from "../../middleware/authorization.middleware.js";
import * as userService from "./user.service.js";
import endpoints from "./user.endpoint.js";

const router = Router();

// get user profile
router.get(
  "/profile",
  isAuthenticated,
  isAuthorized(endpoints.profile),
  userService.profile,
);

export default router;
