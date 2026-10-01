import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const sendMessage = joi
  .object({
    content: joi.string().required(),
    receiver: joi.custom(isValidObjectId).required(),
  })
  .required();

export const getSingleMessage = joi.object({
  id: joi.custom(isValidObjectId).required(),
}).required();

export const getAllMessages = joi.object({}).required();

export const updateMessage = joi.object({}).required();

export const deleteMessage = joi.object({}).required();
