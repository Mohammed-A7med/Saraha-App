import joi from "joi";

import { genders } from "../../DB/models/user.model.js";

export const register = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref("password")),
    userName: joi.string().min(5).max(15).required(),
    isActive: joi.boolean(),
    phone: joi.string().required(),
    gender: joi.string().valid(...Object.values(genders)),
  })
  .required();

export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();
