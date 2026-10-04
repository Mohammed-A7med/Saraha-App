import joi from "joi";

import { generalFields } from "../../middleware/validation.middleware.js";

export const updateProfile = joi
  .object({
    userName: generalFields.userName,
    phone: generalFields.phone,
    email: generalFields.email,
  })
  .required()
