import { UpdateApiaristParams, UpdateApiaristServiceResponse } from "../../models/apiarist/updateApiarist";
import { ApiaristRepository } from "../../repositories/apiaristRepository";



class UpdateApiaristService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(params: UpdateApiaristParams): Promise<UpdateApiaristServiceResponse> {
    try {

      const response = await this.apiaristRepository.update(params);

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


export default UpdateApiaristService;

