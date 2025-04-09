import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { GetAllApiaristServiceResponse } from "../../models/apiarist/getAll";
import { ApiaristRepository } from "../../repositories/apiaristRepository";



class GetAllApiaristService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(): Promise<GetAllApiaristServiceResponse> {
    try {

      const response = await this.apiaristRepository.getAll();

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


export default GetAllApiaristService;

