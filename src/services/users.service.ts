import { PrismaClient } from "@prisma/client";
import { validateUser, validateUserUpdate } from "../../validators/users-validator";
import { UserAuth, UserCreate, UserUpdate } from "../models/users";
import {  comparePassword, generatePassword } from "../../utils/password";
import jwt, { decode } from 'jsonwebtoken'
import { ROLE } from "../../utils/roles";
// import SendEmailService from "./sendEmail.service";
// const sendEmailService = new SendEmailService();

class UsersService {
    private prisma = new PrismaClient();

    async createUser(userCreate: UserCreate): Promise<any> { 
        const {users: UsersDB} = this.prisma;
        const validate = validateUser(userCreate)
        if(validate.error) throw new Error(validate.error.details[0].message);
        const userExists = await UsersDB.findFirst({
            where: {
                OR: [
                    {cpf: userCreate.cpf},
                    {email: userCreate.email}
                ]
            }
        })

        if(userExists){
            if(userExists.cpf === userCreate.cpf) throw new Error('CPF already exists');
            else throw new Error('E-mail already exists');
        }
        const password = await generatePassword(userCreate.password);
        const user = await UsersDB.create({
            data: {
                ...userCreate,
                password,
            }
        })
        delete user.password;
        return user;
    }

    async getAll(role: string): Promise<any> { 
        const {users: UsersDB} = this.prisma;

        const whereCondition =
            role === ROLE.SUPERADMIN
                ? { NOT: { role: ROLE.CUSTOMER } }
                : role === ROLE.ADMIN
                ? { role: ROLE.OPERATOR }
                : {};
        const users = await UsersDB.findMany({
            where: whereCondition,
            select: {
                id: true,
                cpf: true,
                email: true,
                name: true,
                phone: true,
                sex: true,
                active: true,
                role: true,
                created_at: true,
                updated_at: true,
                password: false,
            }
        })
        return users;
    }

    async update(userUpdate: UserUpdate): Promise<any> { 
        const {users: UsersDB} = this.prisma;
        const validate = validateUserUpdate(userUpdate)
        if(validate.error) throw new Error(validate.error.details[0].message);

        const userExists = await UsersDB.findFirst({
            where: {
                OR: [
                    {cpf: userUpdate.cpf},
                    {email: userUpdate.email}
                ]
            }
        })

        if(userExists && userExists.id !== userUpdate.id){
            if(userExists.cpf === userUpdate.cpf) throw new Error('CPF already exists');
            else throw new Error('E-mail already exists');
        }
        const user = await UsersDB.update({
            where: {id: userUpdate.id},
            data: {...userUpdate}
        })
        return user;
    }

    async auth(userAuth: UserAuth): Promise<any>{
        const {users: UsersDB} = this.prisma;
        const {email, password} = userAuth;

        const userExists = await UsersDB.findFirst({where: {email: email}})

        console.log(userExists);

        if(!userExists && !userExists.active) throw new Error('User not found');
        if(!await comparePassword(password, userExists.password)) throw new Error('Password invalid');

        const payload = {
            id: userExists.id,
            email: userExists.email,
            name: userExists.name,
            role: userExists.role,
            active: userExists.active,
            cpf: userExists.cpf,
            phone: userExists.phone,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn: '30d'
        })



        return {token, user: payload};
    }

    async refreshToken(token: string): Promise<any> {
        const { users: UsersDB } = this.prisma;
        try {
            const decoded = jwt.decode(token, { complete: true });
            const userId = (decoded as any)?.payload?.id;


            const user = await UsersDB.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new Error('Invalid user');
            }


            const newPayload = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                
                active: user.active,
                cpf: user.cpf,
                phone: user.phone,
          
            };

            const refreshToken = jwt.sign(newPayload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            return refreshToken;

        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    // async sendEmailResetPassword(email: string): Promise<any> {
    //     const { users: UsersDB, reset_password_token: resetPasswordTokenDB } = this.prisma;
    //     try {
        
    //         const user = await UsersDB.findUnique({
    //             where: {email}
    //         })
    //         if(!user) throw new Error('User not found');

    //         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    //         const link = `${process.env.FRONTEND_URL}resetPassword?token=${token}`


    //         await sendEmailService.resetPassword(email, link);

    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }

    // async changePassword(password: string, userId: number): Promise<any> {
    //     const { users: UsersDB } = this.prisma;
    //     try {
    //         const passwordCript = await generatePassword(password);
    
    //         const user = await UsersDB.update({
    //             where: { id: userId },
    //             data: { password: passwordCript }
    //         });
            

    //         await sendEmailService.confirmPasswordChange(user.email);
    //         return user;
    //     } catch (error) {
    //         console.error("Erro ao alterar senha:", error);
    //         throw new Error(error instanceof Error ? error.message : "Erro desconhecido ao alterar senha");
    //     }
    // }
    

}

export default UsersService;

