import { StatusCodes } from "http-status-codes";
import GetApiaristStatsService from "../../services/apiarist/getApiaristStats.service";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";


export default class GetApiaristStatsController implements Controller{
  constructor(private getApiaristStatsService: GetApiaristStatsService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const response = await this.getApiaristStatsService.perform();

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}