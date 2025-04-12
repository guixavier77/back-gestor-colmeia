import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { GetAllApiaristServiceResponse } from "../../models/apiarist/getAllApiarist";
import { GetApiaristStatsServiceResponse } from "../../models/apiarist/getApiaristStats";
import { ApiaristRepository } from "../../repositories/apiaristRepository";



class GetApiaristStatsService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(): Promise<GetApiaristStatsServiceResponse> {
    try {

      const response = await this.apiaristRepository.getStats();

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


export default GetApiaristStatsService;

