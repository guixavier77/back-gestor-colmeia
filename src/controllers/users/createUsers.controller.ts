import { Request, Response } from "express";
import UsersService from "../../services/users/createUser.service";
import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
// import SendEmailService from "../services/sendEmail.service";
import { StatusCodes } from "http-status-codes";
import { validateUser } from "../../validators/users-validator";
import CreateUserService from "../../services/users/createUser.service";


// const sendEmailService = new SendEmailService();
export default class CreateUserController implements Controller{
    constructor(private createUserService: CreateUserService){}

    public async handle(req: HttpRequest):  Promise<HttpResponse>  {
        try {
            const validate = validateUser(req.body)
            if (validate.error) {
                return { statusCode: StatusCodes.BAD_REQUEST, body: validate.error.details[0].message};
            }
            const response = await this.createUserService.perform(req.body);

            if(response.error){
                return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
            }

            return { statusCode: StatusCodes.OK , body: response};
        } catch (error) {
            return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error};
        }
    }

}
