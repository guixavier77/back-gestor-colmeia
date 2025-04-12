import { StatusCodes } from "http-status-codes";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import CreateApiaristService from "../../services/apiarist/createApiarist.service";
import { validateCreateApiarist, validateUpdateApiarist, validateUpdatePassApiarist } from "../../validators/apiarist-validator";
import UpdateApiaristService from "../../services/apiarist/updateApiarist.service";
import UpdatePasswordApiaristService from "../../services/apiarist/updatePasswordApiarist.service";
import { UpdatePasswordApiaristParams } from "../../models/apiarist/updatePasswordApiarist";


export default class UpdatePasswordApiaristController implements Controller{
  constructor(private updatePasswordApiaristService: UpdatePasswordApiaristService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const validate = validateUpdatePassApiarist(req.body) 

      const {apiaristId, password, confirmPassword} = req.body as UpdatePasswordApiaristParams
      if (validate.error) {
          return { statusCode: StatusCodes.BAD_REQUEST, body: validate.error.details[0].message};
      }
      const response = await this.updatePasswordApiaristService.perform({apiaristId: Number(apiaristId), password, confirmPassword});

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}