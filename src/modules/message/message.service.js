import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import User from "../../DB/models/user.model.js";
import Message from "../../DB/models/message.model.js";

// Send Message
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { content, receiver } = req.body;

  // check if receiver existence
  const user = await User.findById(receiver);
  if (!user) return next(new Error("Receiver not found!", { cause: 404 }));

  await Message.create({ content, receiver, sender: req.user._id });

  return res
    .status(200)
    .json({ success: true, message: "Message Create successfuly" });
});

// Get Single Message
export const getSingleMessage = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, result });
});

// Get All Messages
export const getAllMessages = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ success: true, results });
});

// Update Message
export const updateMessage = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, message: "Message Updated successfuly" });
});

// Delete Message
export const deleteMessage = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, message: "Message Deleted successfuly" });
});
