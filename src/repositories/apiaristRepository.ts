

import { CreateApiaristParams, CreateApiaristRepositoryResponse } from "../models/apiarist/createApiarist";
import { PrismaHelper } from "./helpers";
const { prisma } = PrismaHelper;


export class ApiaristRepository {
  

  public async create(params: CreateApiaristParams): Promise<CreateApiaristRepositoryResponse> {
    const {apicultores: ApiaristRepository} = prisma;

    const exists = await ApiaristRepository.findFirst({
      where: {cpf: params.cpf}
    })

    if(exists) {
      return {
        error: 'CPF de apicultor já cadastrado.'
      }
    }

    const apiarist = await ApiaristRepository.create({
      data: {
        ...params,
      }
    })

    return { 
      data: {
        id: apiarist.id,
        name: apiarist.name,
        cpf: apiarist.cpf
      }
    }
  }
}