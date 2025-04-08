import { PrismaClient } from "@prisma/client";
import { ApicultorCreate } from "../models/apicultor";
import { validateApicultor } from "../../validators/apicultor-validator";


class ApicultorService {
    private prisma = new PrismaClient();

    async create(data: ApicultorCreate): Promise<ApicultorCreate> {  
        const {apicultores: ApicultorDB} = this.prisma;
        const validate = validateApicultor(data)
        if(validate.error) throw new Error(validate.error.details[0].message);

        const apicultorExists = await ApicultorDB.findUnique({ where: { cpf: data.cpf } });
        if (apicultorExists) throw new Error("Já existe um apicultor com este CPF.");
        

        return await ApicultorDB.create({ data });
    }

    async getAll(): Promise<any> { 
    
    }

    async update(): Promise<any> { 
    
    }


}

export default ApicultorService;

