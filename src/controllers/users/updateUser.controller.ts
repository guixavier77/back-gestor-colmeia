import { StatusCodes } from "http-status-codes";
import UpdateUserService from "../../services/users/updateUser.service";
import { validateUpdateUser } from "../../validators/users-validator";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";


export default class UpdateUserController implements Controller{
  constructor(private updateUserService: UpdateUserService){}

  public async handle(req: HttpRequest):  Promise<HttpResponse>  {
    try {
      const validate = validateUpdateUser(req.body)
      const id = req.params?.id;
      if (validate.error) {
          return { statusCode: StatusCodes.BAD_REQUEST, body: validate.error.details[0].message};
      }
      const response = await this.updateUserService.perform({id: Number(id), ...req.body});

      if(response.error){
          return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
      }

      return { statusCode: StatusCodes.OK , body: response};

    } catch (error) {
      return {statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error}
    }
  }
}