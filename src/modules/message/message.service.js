import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";

// Send Message
export const sendMessage = asyncHandler(
  async(req, res, next) => {
    return res
      .status(200)
      .json({ success: true, message: "Message Create successfuly" });
  },
);

// Get Single Message
export const getSingleMessage = asyncHandler(
  async(req, res, next) => {
    return res.status(200).json({ success: true, result });
  },
);

// Get All Messages
export const getAllMessages = asyncHandler(
  async(req, res, next) => {
    return res.status(200).json({ success: true, results });
  },
);

// Update Message
export const updateMessage = asyncHandler(
  async(req, res, next) => {
    return res
      .status(200)
      .json({ success: true, message: "Message Updated successfuly" });
  },
);

// Delete Message
export const deleteMessage = asyncHandler(
  async(req, res, next) => {
    return res
      .status(200)
      .json({ success: true, message: "Message Deleted successfuly" });
  },
);
