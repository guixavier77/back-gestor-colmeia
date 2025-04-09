import Joi from "joi"
import { CreateUserParams, UserUpdate } from "../src/models/users/createUsers"

export function validateUser(user: CreateUserParams) {

    const JoiSchema = Joi.object({
        cpf: Joi.string().min(11).max(11),
        email: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        phone: Joi.string().required().min(10).max(15),

        active: Joi.boolean().required(),
        role: Joi.string().required().valid("superAdmin","admin", "customer", "operator"),
    })

    
	return JoiSchema.validate(user)
}

export function validateAuthUser(user: CreateUserParams) {

    const JoiSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    })

    
	return JoiSchema.validate(user)
}
