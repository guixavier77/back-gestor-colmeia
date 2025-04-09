import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
// import SendEmailService from "../services/sendEmail.service";
import { StatusCodes } from "http-status-codes";
import { validateAuthUser } from "../../../validators/users-validator";
import AuthUserService from "../../services/users/authUser.service";


// const sendEmailService = new SendEmailService();
export default class AuthUserController implements Controller{
    constructor(private authUserService: AuthUserService){}

    public async handle(req: HttpRequest):  Promise<HttpResponse>  {
        try {
            const validate = validateAuthUser(req.body)
            if (validate.error) {
                return { statusCode: StatusCodes.BAD_REQUEST, body: validate.error.details[0].message};
            }
            const response = await this.authUserService.perform(req.body);

            if(response.error){
                return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
            }

            return { statusCode: StatusCodes.OK , body: response};
        } catch (error) {
            return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error};
        }
    }

}
