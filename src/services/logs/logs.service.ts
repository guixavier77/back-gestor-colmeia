import { LogServiceParams } from '../../models/logs/log';
import { LogRepository } from '../../repositories/logRepository';

class LogsService {
    constructor(){}
    async perform(params: LogServiceParams): Promise<any> { 

        try {
    
            const response = await new LogRepository().create(params);

            return response;
        } catch (error) {
            return { error: `${error}` };
        }
    }
}

export default LogsService;

