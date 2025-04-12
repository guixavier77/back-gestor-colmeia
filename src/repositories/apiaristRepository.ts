

import { CreateApiaristParams, CreateApiaristRepositoryResponse } from "../models/apiarist/createApiarist";
import { GetAllApiaristRepositoryResponse } from "../models/apiarist/getAllApiarist";
import { GetApiaristLatestRepositoryResponse } from "../models/apiarist/getApiaristLatest";
import { GetApiaristStatsRepositoryResponse } from "../models/apiarist/getApiaristStats";
import { GetApiaristStatsByPeriodRepositoryResponse } from "../models/apiarist/getApiaristStatsByPeriod";
import { UpdateApiaristParams, UpdateApiaristRepositoryResponse } from "../models/apiarist/updateApiarist";
import { UpdatePasswordApiaristParams, UpdatePasswordApiaristServiceResponse } from "../models/apiarist/updatePasswordApiarist";
import { generatePassword } from "../utils/password";
import { PrismaHelper } from "./helpers";
const { prisma } = PrismaHelper;

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfYear, endOfYear } from 'date-fns';

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
        longitude: apiarist.longitude,
        email: apiarist.email
      }
    }
  }

  public async getAll(): Promise<GetAllApiaristRepositoryResponse> {
    const {apicultores: ApiaristRepository} = prisma;

    const apiarists = await ApiaristRepository.findMany();

    return { 
      data: apiarists.map((api) => ({
        id: api.id,
        name: api.name,
        phone: api.phone,
        cpf: api.cpf,
        latitude: api.latitude,
        longitude: api.longitude,
        email: api.email,
        active: api.active,
        created_at: api.created_at,
        updated_at: api.updated_at,
      }))
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


  public async updatePassword(params: UpdatePasswordApiaristParams): Promise<UpdatePasswordApiaristServiceResponse>{
    const {apicultores: ApiaristRepository} = prisma;

    const apiarist = await ApiaristRepository.update({
      where: {
        id: params.apiaristId,
      },
      data: {
        password: params.password
      }
    })

    if(apiarist) {
      return {
        data: {
          id: apiarist.id,
          active: apiarist.active,
          cpf: apiarist.cpf,
          latitude: apiarist.latitude,
          longitude: apiarist.longitude,
          name: apiarist.name,
          phone: apiarist.phone
        }
      }
    }

    return {
      error: 'Usuário não encontrado!'
    }
  }


  public async getStats(): Promise<GetApiaristStatsRepositoryResponse>{
    const {apicultores: ApiaristRepository} = prisma;
    const totalAssociates = await ApiaristRepository.count({
      where: { active: true },
    });
  
    const totalDisassociated = await ApiaristRepository.count({
      where: { active: false },
    });

    return { data: {
      totalAssociates,
      totalDisassociated
    }}
  }

  
  public async getStatsByPeriod(): Promise<GetApiaristStatsByPeriodRepositoryResponse>{
    const {apicultores: ApiaristRepository} = prisma;

    const sumCounts = (items: { _count: number }[]) =>
      items.reduce((total, item) => total + item._count, 0);
    const now = new Date();

    const [month, monthDeactivated] = await Promise.all([
      ApiaristRepository.groupBy({
        by: ['created_at'],
        where: {
          created_at: {
            gte: startOfMonth(now),
            lte: endOfMonth(now),
          },
        },
        _count: true,
      }),
      ApiaristRepository.groupBy({
        by: ['updated_at'],
        where: {
          active: false,
          updated_at: {
            gte: startOfMonth(now),
            lte: endOfMonth(now),
          },
        },
        _count: true,
      }),
    ]);

    const [week, weekDeactivated] = await Promise.all([
      ApiaristRepository.groupBy({
        by: ['created_at'],
        where: {
          created_at: {
            gte: startOfWeek(now),
            lte: endOfWeek(now),
          },
        },
        _count: true,
      }),
      ApiaristRepository.groupBy({
        by: ['updated_at'],
        where: {
          active: false,
          updated_at: {
            gte: startOfWeek(now),
            lte: endOfWeek(now),
          },
        },
        _count: true,
      }),
    ]);

    const [year, yearDeactivated] = await Promise.all([
      ApiaristRepository.groupBy({
        by: ['created_at'],
        where: {
          created_at: {
            gte: startOfYear(now),
            lte: endOfYear(now),
          },
        },
        _count: true,
      }),
      ApiaristRepository.groupBy({
        by: ['updated_at'],
        where: {
          active: false,
          updated_at: {
            gte: startOfYear(now),
            lte: endOfYear(now),
          },
        },
        _count: true,
      }),
    ]);

    return {
      data: {
        month: {
          totalAssociates: sumCounts(month),
          totalDisassociated: sumCounts(monthDeactivated),
        },
        week: {
          totalAssociates: sumCounts(week),
          totalDisassociated: sumCounts(weekDeactivated),
        },
        year: {
          totalAssociates: sumCounts(year),
          totalDisassociated: sumCounts(yearDeactivated),
        },
      }
    };
  }


  public async getLatest(limit = 5): Promise<GetApiaristLatestRepositoryResponse> {
    const { apicultores: ApiaristRepository } = prisma;
    const latestAssociate = await ApiaristRepository.findMany({
      where: { active: true },
      orderBy: { created_at: 'desc' },
      take: limit,
    })

    const latestDisassociated = await ApiaristRepository.findMany({
      where: { active: false },
      orderBy: { updated_at: 'desc' },
      take: limit,
    })


    return {
      data: {
        latestDisassociated: latestDisassociated.map((apiarist) => ({
          id: apiarist.id,
          name: apiarist.name,
          date: apiarist.updated_at,
          cpf: apiarist.cpf,
        })),
        latestAssociated: latestAssociate.map((apiarist) => ({
          id: apiarist.id,
          name: apiarist.name,
          date: apiarist.created_at,
          cpf: apiarist.cpf
        })),
      }
    }
  
  }
  
}