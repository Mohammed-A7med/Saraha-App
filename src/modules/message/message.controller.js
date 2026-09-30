import { Router } from "express";

const router = Router();

// send message
router.post("/")

// get single message
router.get("/:id")

// get all messages
router.get("/")

// update message
router.patch("/:id")

// delete message
router.delete("/:id")

export default router;
