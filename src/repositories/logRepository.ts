
import { LogServiceParams } from "../models/logs/log";
import { PrismaHelper } from "./helpers";

const { prisma } = PrismaHelper;



export class LogRepository {


  public async create(params: LogServiceParams): Promise<any> {
      const {logs: LogRepository} = prisma;

      
      const log = await LogRepository.create({
        data: params
      })

      return log
  }



}