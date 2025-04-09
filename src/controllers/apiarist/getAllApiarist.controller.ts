import { StatusCodes } from "http-status-codes";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import CreateApiaristService from "../../services/apiarist/createApiarist.service";
import { validateCreateApiarist } from "../../validators/apiarist-validator";
import GetAllApiaristService from "../../services/apiarist/getAllApiarist.service";


export default class GetAllApiaristController implements Controller{
  constructor(private getAllApiaristService: GetAllApiaristService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const response = await this.getAllApiaristService.perform();

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}