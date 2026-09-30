import { Router } from "express";

import * as messageSevice from "./message.service.js";

const router = Router();

// send message
router.post("/", messageSevice.sendMessage);

// get single message
router.get("/:id", messageSevice.getSingleMessage);

// get all messages
router.get("/", messageSevice.getAllMessages);

// update message
router.patch("/:id", messageSevice.updateMessage);

// delete message
router.delete("/:id", messageSevice.deleteMessage);

export default router;
