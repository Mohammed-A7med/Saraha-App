import joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";

export const messageFlags = {
  inbox: "inbox",
  outbox: "outbox",
};

export const sendMessage = joi
  .object({
    content: joi.string().required(),
    receiver: joi.custom(isValidObjectId).required(),
  })
  .required();

export const getSingleMessage = joi
  .object({
    // params
    id: joi.custom(isValidObjectId).required(),
  })
  .required();

export const getAllMessages = joi
  .object({
    // query
    flag: joi.valid(...Object.values(messageFlags)).required(),
  })
  .required();

export const updateMessage = joi
  .object({
    // body
    content: joi.string().required(),
    // params
    id: joi.custom(isValidObjectId).required(),
  })
  .required();

export const deleteMessage = joi.object({}).required();
