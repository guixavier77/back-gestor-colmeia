import { StatusCodes } from "http-status-codes";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import CreateApiaristService from "../../services/apiarist/createApiarist.service";
import { validateCreateApiarist } from "../../validators/apiarist-validator";


export default class CreateApiaristController implements Controller{
  constructor(private createApiaristService: CreateApiaristService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const validate = validateCreateApiarist(req.body)
      if (validate.error) {
          return { statusCode: StatusCodes.BAD_REQUEST, body: validate.error.details[0].message};
      }
      const response = await this.createApiaristService.perform(req.body);

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}