import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { ApiaristRepository } from "../../repositories/apiaristRepository";



class CreateApiaristService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(params: CreateApiaristParams): Promise<CreateApiaristServiceResponse> {
    try {

      const response = await this.apiaristRepository.create(params);

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

