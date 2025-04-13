
import { CreateUserRepositoryResponse, CreateUserServiceParams } from "../models/users/createUsers";
import {UpdateUserParams, UpdateUserRepositoryResponse} from '../models/users/updateUser';
import { GetAllUsersRepositoryResponse } from "../models/users/getAllUsers";
import { ROLE } from "../utils/roles";
import { PrismaHelper } from "./helpers";

const { prisma } = PrismaHelper;



export class UserRepository {


  public async create(params: CreateUserServiceParams): Promise<CreateUserRepositoryResponse> {
      const {usuarios: UsersRepository} = prisma;

      const alreadyUser = await UsersRepository.findFirst({
        where: {
          OR: [
            { cpf: params.cpf },
            { email: params.email }
          ]
        },
      });

      if (alreadyUser) {
        return {
          error: 'Cpf ou e-mail já cadastrado!!'
        }
      }
  
      const user = await UsersRepository.create({
        data: {
            ...params,
        }
      })

      return { 
        data: {
          id: user.id,
          cpf: user.cpf,
          email: user.email,
          name: user.name,
          phone: user.phone,
          active: user.active,
          role: user.role,
          password: user.password,
          created_at: user.created_at,
          updated_at: user.updated_at,
      }}
  }

  public async update(params: UpdateUserParams): Promise<UpdateUserRepositoryResponse> {
    const {usuarios: UserRepository} = prisma;
    const {cpf,id,name,email,phone, active} = params;

    const existingCpf = await UserRepository.findFirst({
      where: {
        OR: [
          { cpf },
          { email },
        ],
        NOT: {
          id
        }
      }
    })

    if(existingCpf){
      return {error:  'CPF/Email já existe!'}
    }
    const user = await UserRepository.update({
      where: {
        id
      },
      data: {
        cpf,
        email,
        name,
        phone,
        active,
      }
    });

    delete user.password;

    return { 
      data: user
    }
  }


  public async getAll(): Promise<GetAllUsersRepositoryResponse> {
    const {usuarios: UsersRepository} = prisma;

    const users = await UsersRepository.findMany({
      where: {
        role: {
          not: ROLE.SUPERADMIN,
        },
      },
    });
    

    return { 
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        cpf: user.cpf,
        email: user.email,
        role: user.role,
        active: user.active,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }))
    }
    
  }

}