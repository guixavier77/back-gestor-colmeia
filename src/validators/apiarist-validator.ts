import Joi from "joi";
import { CreateApiaristParams } from "../models/apiarist/createApiarist";

const baseSchema = Joi.object({
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "CPF deve conter 11 números",
      "any.required": "O campo CPF é obrigatório",
    }),

  name: Joi.string().min(3).required().messages({
    "string.min": "O nome deve ter no mínimo 3 caracteres",
    "any.required": "O campo nome é obrigatório",
  }),

  phone: Joi.string().pattern(/^\d{10,15}$/).required().messages({
    "string.pattern.base": "Número de telefone inválido",
    "any.required": "O campo telefone é obrigatório",
  }),

  latitude: Joi.string().required().messages({
    "any.required": "Latitude é obrigatória",
  }),

  longitude: Joi.string().required().messages({
    "any.required": "Longitude é obrigatória",
  }),

  active: Joi.boolean().required(),

  email: Joi.string().email().required().messages({
    "string.email": "E-mail inválido",
    "any.required": "O campo e-mail é obrigatório",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter pelo menos 6 caracteres",
    "any.required": "O campo senha é obrigatório",
  }),
});

export function validateCreateApiarist(data: CreateApiaristParams) {
    return baseSchema.validate(data, { abortEarly: false });
}

export function validateUpdateApiarist(data: CreateApiaristParams) {
    const updateSchema = baseSchema.fork(["password"], (field) => field.optional());
    return updateSchema.validate(data, { abortEarly: false });
}
