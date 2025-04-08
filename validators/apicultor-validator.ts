import Joi from "joi"
import { UserCreate, UserUpdate } from "../src/models/users/createUsers"
import { ApicultorCreate } from "../src/models/apicultor"

export function validateApicultor(apicultor: ApicultorCreate) {

    const JoiSchema = Joi.object({
        cpf: Joi.string().min(11).max(11),
        name: Joi.string().required(),
    })

    
	return JoiSchema.validate(apicultor)
}

