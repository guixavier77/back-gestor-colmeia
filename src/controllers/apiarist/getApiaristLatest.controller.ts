import { StatusCodes } from "http-status-codes";
import GetApiaristStatsService from "../../services/apiarist/getApiaristStats.service";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import GetApiaristLatestService from "../../services/apiarist/getApiaristLatest.service";


export default class GetApiaristLastestController implements Controller{
  constructor(private getApiaristLatestService: GetApiaristLatestService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const response = await this.getApiaristLatestService.perform();

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}