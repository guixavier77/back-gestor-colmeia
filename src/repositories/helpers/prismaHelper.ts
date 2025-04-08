import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: [{ level: 'query', emit: 'event' }]
  });
  
  export default prisma;

export const PrismaHelper = {
    prisma,
    async connect(): Promise<void> {
      await this.prisma.$connect();
    },
    async disconnect(): Promise<void> {
      await this.prisma.$disconnect();
    }
  };