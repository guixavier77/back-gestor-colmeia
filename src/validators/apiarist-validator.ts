import Joi from "joi"
import { CreateApiaristParams } from "../models/apiarist/createApiarist"

export function validateCreateApiarist(data: CreateApiaristParams) {

    const JoiSchema = Joi.object({
        cpf: Joi.string().min(11).max(11),
        name: Joi.string().required(),
        phone: Joi.string().required().min(10).max(15),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),

    })

    
	return JoiSchema.validate(data)
}




