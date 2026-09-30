import { Router } from "express";

import * as messageSevice from "./message.service.js";
import * as messageSchema from "./message.validation.js";
import validation from "../../middleware/validation.middleware.js";

const router = Router();

// send message
router.post(
  "/",
  validation(messageSchema.sendMessage),
  messageSevice.sendMessage,
);

// get single message
router.get(
  "/:id",
  validation(messageSchema.getSingleMessage),
  messageSevice.getSingleMessage,
);

// get all messages
router.get(
  "/",
  validation(messageSchema.getAllMessages),
  messageSevice.getAllMessages,
);

// update message
router.patch(
  "/:id",
  validation(messageSchema.updateMessage),
  messageSevice.updateMessage,
);

// delete message
router.delete(
  "/:id",
  validation(messageSchema.deleteMessage),
  messageSevice.deleteMessage,
);

export default router;
