import { StatusCodes } from "http-status-codes";
import GetApiaristStatsService from "../../services/apiarist/getApiaristStats.service";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import GetApiaristStatsByPeriodService from "../../services/apiarist/getApiaristStatsByPeriod.service";


export default class GetApiaristStatsByPeriodController implements Controller{
  constructor(private getApiaristStatsByPeriodService: GetApiaristStatsByPeriodService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const response = await this.getApiaristStatsByPeriodService.perform();

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}