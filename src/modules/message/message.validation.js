import joi from "joi";

export const sendMessage = joi.object({}).required();

export const getSingleMessage = joi.object({}).required();

export const getAllMessages = joi.object({}).required();

export const updateMessage = joi.object({}).required();

export const deleteMessage = joi.object({}).required();
