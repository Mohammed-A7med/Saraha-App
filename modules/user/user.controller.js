import { Router } from "express";
import * as userService from "./user.service.js";

const router = Router();

// get user profile
router.get("/profile", userService.profile);

export default router;
