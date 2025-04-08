import { generatePassword } from "../../../utils/password";
import { CreateUserServiceResponse, CreateUserParams } from "../../models/users/createUsers";
import { UserRepository } from "../../repositories/userRepository";

class CreateUserService {
    constructor(private userRepository: UserRepository){}
    async perform(params: CreateUserParams): Promise<CreateUserServiceResponse> { 

        try {
            const password = await generatePassword(params.password);
    
            const response = await this.userRepository.create({ ...params, password });
            if(response.data){
                return {data: response.data}
            }
    
            return {error: response.error};
        } catch (error) {
            return { error: `${error}` };
        }
    }
}

export default CreateUserService;

