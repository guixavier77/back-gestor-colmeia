import { Controller, HttpRequest, HttpResponse } from "../protocols/controller.protocols";
import { StatusCodes } from "http-status-codes";
import RefreshTokenUserService from "../../services/users/refreshTokenUser.service";


export default class RefreshTokenUserController implements Controller{
    constructor(private refreshTokenUser: RefreshTokenUserService){}

    public async handle(req: HttpRequest):  Promise<HttpResponse>  {
        try {
            const { authorization } = req.headers

            if(!authorization) {
                return { statusCode: StatusCodes.UNAUTHORIZED, body: "Token não encontrado."};
            }
            const response = await this.refreshTokenUser.perform({ token: authorization!});

            if(response.error){
                return { statusCode: StatusCodes.BAD_REQUEST, body: response.error};
            }

            return { statusCode: StatusCodes.OK , body: response};
        } catch (error) {
            return { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, body: error};
        }
    }

}
