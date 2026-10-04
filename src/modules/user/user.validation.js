import joi from "joi";

import { generalFields } from "../../middleware/validation.middleware.js";

export const updateProfile = joi
  .object({
    userName: generalFields.userName,
    phone: generalFields.phone,
    email: generalFields.email,
  })
  .required();

export const updatePassword = joi
  .object({
    oldPassword: generalFields.password,
    newPassword: generalFields.password.not(joi.ref("oldPassword")),
    confirmPassword: generalFields.confirmPassword.valid(
      joi.ref("newPassword"),
    ),
  })
  .required();

export const deactivateAccount = joi
  .object({
    password: generalFields.password.required(),
  })
  .required();
