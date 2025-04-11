import jwt from 'jsonwebtoken';
import { RefreshTokenServiceParams, RefreshTokenServiceResponse } from '../../models/users/refreshTokenUsers';
import { AuthRepository } from "../../repositories/authRepository";

class RefreshTokenUserService {
    constructor(){}
    async perform(params: RefreshTokenServiceParams): Promise<RefreshTokenServiceResponse> { 

        try {
    
            const oldToken = params.token?.split(' ')[1];
            const payload = jwt.decode(oldToken) as any;

            if (!payload) {
                return { error: 'Token inválido' };
            }

            
            delete payload.iat
            delete payload.exp

            const token = jwt.sign({ ...payload }, process.env.JWT_SECRET!, { expiresIn: '30d' });

            return {token}    

        } catch (error) {
            console.log(error);
            return { error: `${error}` };
        }
    }
}

export default RefreshTokenUserService;

