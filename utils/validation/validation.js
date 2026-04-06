import joi from "joi";

export const loginSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  password: joi.string().min(8).required(),
}, {abortEarly: false});
