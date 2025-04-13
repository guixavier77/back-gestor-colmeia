import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { GetAllApiaristServiceResponse } from "../../models/apiarist/getAllApiarist";
import { GetAllUsersServiceResponse } from "../../models/users/getAllUsers";
import { ApiaristRepository } from "../../repositories/apiaristRepository";
import { UserRepository } from "../../repositories/userRepository";



class GetAllUsersService {
  constructor(private usersRepository: UserRepository){}

  async perform(): Promise<GetAllUsersServiceResponse> {
    try {

      const response = await this.usersRepository.getAll();

      if(response.data)
        return {
          data: response.data
        }
      return {error: response.error }
    } catch (error) {
      return { error: `${error}` };
    }
  }
}


export default GetAllUsersService;

