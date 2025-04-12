import { CreateApiaristParams, CreateApiaristServiceResponse } from "../../models/apiarist/createApiarist";
import { GetAllApiaristServiceResponse } from "../../models/apiarist/getAllApiarist";
import { GetApiaristStatsServiceResponse } from "../../models/apiarist/getApiaristStats";
import { GetApiaristStatsByPeriodServiceResponse } from "../../models/apiarist/getApiaristStatsByPeriod";
import { ApiaristRepository } from "../../repositories/apiaristRepository";



class GetApiaristStatsByPeriodService {
  constructor(private apiaristRepository: ApiaristRepository){}

  async perform(): Promise<GetApiaristStatsByPeriodServiceResponse> {
    try {

      const response = await this.apiaristRepository.getStatsByPeriod();

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


export default GetApiaristStatsByPeriodService;

