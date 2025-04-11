
import { comparePassword } from "../utils/password";
import { AuthRepositoryParams, AuthRepositoryResponse } from "../models/users/authUsers";
import { CreateUserRepositoryResponse, CreateUserServiceParams } from "../models/users/createUsers";
import { PrismaHelper } from "./helpers";
import { AuthApiaristRepositoryResponse } from "../models/apiarist/authApiarist";

const { prisma } = PrismaHelper;



export class AuthRepository {


  public async auth(params: AuthRepositoryParams): Promise<AuthRepositoryResponse> {
      const { email, password } = params;
      const { usuarios: UserRepository } = prisma;
  
      const user = await UserRepository.findFirst({
        where: {
          AND: [
            {
              email
            }, {
              active: true
            }
          ]
        },
      });
  
      if (user && user.active) {
  
        const validPassword = await comparePassword(password, user.password);
  
        if (validPassword) {
          return {
            data: {
              id: user.id,
              active: user.active,
              cpf: user.cpf,
              created_at: user.created_at,
              updated_at: user.updated_at,
              email: user.email,
              name: user.name,
              phone: user.phone,
              role: user.role,
            }
          }
        }
        return {
          error: "Senha incorreta!"
        };
      }
  
      return {
        error: "Usuário não encontrado!"
      };
  }

  public async authApiarist(params: AuthRepositoryParams): Promise<AuthApiaristRepositoryResponse> {
    const { email, password } = params;
    const { apicultores: ApiaristRepository } = prisma;

    const user = await ApiaristRepository.findFirst({
      where: {
        AND: [
          {
            email
          }, {
            active: true
          }
        ]
      },
    });

    if (user && user.active) {

      const validPassword = await comparePassword(password, user.password);

      if (validPassword) {
        return {
          data: {
            id: user.id,
            active: user.active,
            cpf: user.cpf,
            created_at: user.created_at,
            updated_at: user.updated_at,
            email: user.email,
            name: user.name,
            phone: user.phone,
            latitude: user.latitude,
            longitude: user.longitude
          }
        }
      }
      return {
        error: "Senha incorreta!"
      };
    }

    return {
      error: "Usuário não encontrado!"
    };
}
}