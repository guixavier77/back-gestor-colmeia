import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { ApiaristRepository } from "../../repositories/apiaristRepository";
import { generatePassword } from "../../utils/password";



class CreateApiaristService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(params: CreateApiaristParams): Promise<CreateApiaristServiceResponse> {
    try {


      const password = await generatePassword(params.password);
      const response = await this.apiaristRepository.create({...params, password});

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


export default CreateApiaristService;

