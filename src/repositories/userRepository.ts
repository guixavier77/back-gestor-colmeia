
import { CreateUserRepositoryResponse, CreateUserParams } from "../models/users/createUsers";
import { PrismaHelper } from "./helpers";

const { prisma } = PrismaHelper;



export class UserRepository {


    public async create(params: CreateUserParams): Promise<CreateUserRepositoryResponse> {
      const {usuarios: UsersDB} = prisma;

      const alreadyUser = await UsersDB.findFirst({
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
  
      const user = await UsersDB.create({
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