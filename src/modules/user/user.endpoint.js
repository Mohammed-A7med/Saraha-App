import { roles } from "../../DB/models/user.model.js";

const endpoints = {
  profile: [roles.user],
};

export default endpoints;
