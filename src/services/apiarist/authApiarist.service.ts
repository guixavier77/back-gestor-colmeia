import jwt from 'jsonwebtoken';
import { AuthServiceParams, AuthServiceResponse } from "../../models/users/authUsers";
import { AuthRepository } from "../../repositories/authRepository";
import { AuthApiaristServiceResponse } from '../../models/apiarist/authApiarist';

class AuthApiaristService {
    constructor(private authRepository: AuthRepository){}
    async perform(params: AuthServiceParams): Promise<AuthApiaristServiceResponse> { 

        try {
    
            const response = await this.authRepository.authApiarist(params);

            const {data, error} = response;
            if(data){
                delete data.password;

                const token =  jwt.sign({ ...data }, process.env.JWT_SECRET || '', {
                    expiresIn: '30d',
                });
                return {data: response.data, token}
            }
    
            return {error};
        } catch (error) {
            return { error: `${error}` };
        }
    }
}

export default AuthApiaristService;

