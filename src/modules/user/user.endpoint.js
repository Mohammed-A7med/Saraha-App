import { roles } from "../../DB/models/user.model.js";

const endpoints = {
  profile: [roles.user],
  updateProfile: [roles.user],
};

export default endpoints;
