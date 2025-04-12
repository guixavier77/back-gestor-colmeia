
import { CreateUserRepositoryResponse, CreateUserServiceParams } from "../models/users/createUsers";
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

}