import { Types } from "mongoose";
import joi from "joi";

export const generalFields = {
  email: joi.string().email(),
  password: joi.string(),
  confirmPassword: joi.string(),
  userName: joi.string().min(5).max(15),
  phone: joi.string()
};

const validation = (schema) => {
  return (req, res, next) => {
    const data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const messageList = error.details.map((obj) => obj.message);
      return next(new Error(messageList, { cause: 400 }));
    }

    return next();
  };
};

export const isValidObjectId = (value, helper) => {
  if (Types.ObjectId.isValid(value)) return true;

  return helper.message("Invalid ObjectId");
};

export default validation;
