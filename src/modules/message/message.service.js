import { asyncHandler } from "../../utils/errorHandling/asyncHandler.js";
import User from "../../DB/models/user.model.js";
import Message from "../../DB/models/message.model.js";
import { messageFlags } from "./message.validation.js";

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
  const { user } = req;
  const message = await Message.findById(req.params.id);

  if (
    message.receiver.toString() == user._id.toString() ||
    message.sender.toString() == user._id.toString()
  )
    return res.status(200).json({ success: true, result: { message } });

  return next(new Error("Unauthorized", { cause: 401 }));
});

// Get All Messages
export const getAllMessages = asyncHandler(async (req, res, next) => {
  // flag inbox or outbox
  const { flag } = req.query;

  let messages;
  if (flag == messageFlags.inbox) {
    messages = await Message.find({ sender: req.user._id });
  } else {
    messages = await Message.find({ receiver: req.user._id });
  }

  return res.status(200).json({ success: true, result: { messages } });
});

// Update Message
export const updateMessage = asyncHandler(async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;
  const { content } = req.body;

  const message = await Message.findOneAndUpdate(
    { _id: id, sender: user._id },
    { content },
    { new: true, runValidators: true },
  );

  if (!message) {
    return next(new Error("Message not found", { cause: 404 }));
  }
  
  return res.status(200).json({
    success: true,
    message: "Message updated successfully",
  });
});

// Delete Message
export const deleteMessage = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, message: "Message Deleted successfuly" });
});
