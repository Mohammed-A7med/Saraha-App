import { roles } from "../../DB/models/user.model.js";

const endpoints = {
  profile: [roles.user],
  updateProfile: [roles.user],
  updatePassword: [roles.user],
};

export default endpoints;
