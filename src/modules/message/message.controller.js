import { Router } from "express";

import * as messageSevice from "./message.service.js";
import * as messageSchema from "./message.validation.js";
import validation from "../../middleware/validation.middleware.js";
import isAuthenticated from "../../middleware/authentication.middleware.js";
import isAuthorized from "../../middleware/authorization.middleware.js";

const router = Router();

// send message
router.post(
  "/",
  isAuthenticated,
  isAuthorized(),
  validation(messageSchema.sendMessage),
  messageSevice.sendMessage,
);

// get single message
router.get(
  "/:id",
  isAuthenticated,
  isAuthorized(),
  validation(messageSchema.getSingleMessage),
  messageSevice.getSingleMessage,
);

// get all messages
router.get(
  "/",
  isAuthenticated,
  isAuthorized(),
  validation(messageSchema.getAllMessages),
  messageSevice.getAllMessages,
);

// update message
router.patch(
  "/:id",
  isAuthenticated,
  isAuthorized(),
  validation(messageSchema.updateMessage),
  messageSevice.updateMessage,
);

// delete message
router.delete(
  "/:id",
  isAuthenticated,
  isAuthorized(),
  validation(messageSchema.deleteMessage),
  messageSevice.deleteMessage,
);

export default router;
