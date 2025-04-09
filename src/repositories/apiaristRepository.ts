

import { CreateApiaristParams, CreateApiaristRepositoryResponse } from "../models/apiarist/createApiarist";
import { GetAllApiaristRepositoryResponse } from "../models/apiarist/getAllApiarist";
import { UpdateApiaristParams, UpdateApiaristRepositoryResponse } from "../models/apiarist/updateApiarist";
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
        cpf: apiarist.cpf,
        phone: apiarist.phone,
        latitude: apiarist.latitude,
        longitude: apiarist.longitude
      }
    }
  }

  public async getAll(): Promise<GetAllApiaristRepositoryResponse> {
    const {apicultores: ApiaristRepository} = prisma;

    const apiarists = await ApiaristRepository.findMany();

    return { 
      data: apiarists
    }
  }


  public async update(params: UpdateApiaristParams): Promise<UpdateApiaristRepositoryResponse> {
    const {apicultores: ApiaristRepository} = prisma;
    const {cpf,id,latitude,longitude,name,phone, active} = params;

    const existingCpf = await ApiaristRepository.findFirst({
      where: {
        cpf,
        NOT: {
          id
        }
      }
    })

    if(existingCpf){
      return {error:  'CPF já existe!'}
    }
    const apiarist = await ApiaristRepository.update({
      where: {
        id
      },
      data: {
        cpf,
        latitude,
        longitude,
        name,
        phone,
        active,
      }
    });

    return { 
      data: apiarist
    }
  }
}