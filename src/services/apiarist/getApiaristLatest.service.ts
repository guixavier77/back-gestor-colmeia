import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { GetAllApiaristServiceResponse } from "../../models/apiarist/getAllApiarist";
import { GetApiaristLatestServiceResponse } from "../../models/apiarist/getApiaristLatest";
import { GetApiaristStatsServiceResponse } from "../../models/apiarist/getApiaristStats";
import { ApiaristRepository } from "../../repositories/apiaristRepository";



class GetApiaristLatestService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(): Promise<GetApiaristLatestServiceResponse> {
    try {

      const response = await this.apiaristRepository.getLatest();

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


export default GetApiaristLatestService;

