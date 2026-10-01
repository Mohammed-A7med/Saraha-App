import { roles } from "../../DB/models/user.model.js";

const endpoints = {
  sendMessage: [roles.user],
  getSingleMessage: [roles.user],
  getAllMessages: [roles.user],
  updateMessage: [roles.user],
  deleteMessage: [roles.user],
};

export default endpoints;
