import joi from "joi";

import { genders } from "../../DB/models/user.model.js";
import { generalFields } from "../../middleware/validation.middleware.js";

export const register = joi
  .object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.confirmPassword.valid(joi.ref("password")).required(),
    userName: generalFields.userName.required(),
    isActive: joi.boolean(),
    phone: generalFields.phone.required(),
    gender: joi.string().valid(...Object.values(genders)),
  })
  .required();

export const login = joi
  .object({
    email: generalFields.email.required(),
    password: generalFields.password.required(),
  })
  .required();
