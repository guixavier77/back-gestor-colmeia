import { UpdateUserParams, UpdateUserServiceResponse } from "../../models/users/updateUser";
import { UserRepository } from "../../repositories/userRepository";



class UpdateUserService {
  constructor(private userRepository: UserRepository){}

  async perform(params: UpdateUserParams): Promise<UpdateUserServiceResponse> {
    try {

      const response = await this.userRepository.update(params);

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


export default UpdateUserService;

