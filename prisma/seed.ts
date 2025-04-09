import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { ROLE } from '../src/utils/roles'

const prisma = new PrismaClient()

const main = async () => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash('password', salt)

  await prisma.usuarios.create({
    data: {
      id: 1,
      cpf: '11052557600',
      email: 'xguilherme1@gmail.com',
      name: 'Guilherme Xavier Martins',
      phone: '33998364168',
      active: true,
      role: ROLE.SUPERADMIN, 
      password: password,
    }
  })

}

main()
  .catch((err) => {
    console.log('Seeding error: ', err)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
