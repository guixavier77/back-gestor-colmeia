import jwt from 'jsonwebtoken';
import { UpdatePasswordApiaristParams, UpdatePasswordApiaristServiceResponse } from '../../models/apiarist/updatePasswordApiarist';
import { ApiaristRepository } from '../../repositories/apiaristRepository';
import { generatePassword } from '../../utils/password';

class UpdatePasswordApiaristService {
    constructor(private apiaristRepository: ApiaristRepository){}
    async perform(params: UpdatePasswordApiaristParams): Promise<UpdatePasswordApiaristServiceResponse> { 

        try {
            if(params.password !== params.confirmPassword){
                return {error: 'Senhas não coincidem!'}
            }
            const password = await generatePassword(params.password);
            const {data, error} = await this.apiaristRepository.updatePassword({...params, password});

            if(data){
                return {data}
            }
    
            return {error};
        } catch (error) {
            return { error: `${error}` };
        }
    }
}

export default UpdatePasswordApiaristService;

