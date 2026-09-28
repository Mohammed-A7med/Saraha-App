import { Router } from "express";

import * as authService from "./auth.service.js";
import * as authSchemas from "./auth.validation.js";
import validation from "../../middleware/validation.middleware.js";

const router = Router();

// register
router.post(
  "/register",
  validation(authSchemas.register),
  authService.register,
);

// login
router.post("/login", validation(authSchemas.login), authService.login);

router.get("/activate_account/:token", authService.activateAccount);

export default router;
