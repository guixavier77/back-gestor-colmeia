import { StatusCodes } from "http-status-codes";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import CreateApiaristService from "../../services/apiarist/createApiarist.service";
import { validateCreateApiarist, validateUpdateApiarist } from "../../validators/apiarist-validator";
import UpdateApiaristService from "../../services/apiarist/updateApiarist.service";


export default class UpdateApiaristController implements Controller{
  constructor(private updateApiaristService: UpdateApiaristService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const validate = validateUpdateApiarist(req.body)
      const id = req.params?.id;
      if (validate.error) {
          return { statusCode: StatusCodes.BAD_REQUEST, body: validate.error.details[0].message};
      }
      const response = await this.updateApiaristService.perform({id: Number(id), ...req.body});

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}