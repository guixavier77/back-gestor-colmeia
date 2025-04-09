import { CreateUserServiceParams } from "./createUsers";


// --------- useCase -----------
export type AuthServiceParams = {
    email: string;
    password: string;
}

export type AuthServiceResponse = {
    data?: {
        id: number;
        password?: string;
        cpf: string;
        name: string;
        email: string;
        phone: string;
        active: boolean;
        created_at: Date;
        updated_at: Date;
    }
    token?: string;
    error?: string;
}

// ------ repository -----------
export type AuthRepositoryParams = {
    email: string;
    password: string;
}

export type AuthRepositoryResponse = {
    data?:{
        id: number;
        password?: string;
        cpf: string;
        name: string;
        email: string;
        phone: string;
        active: boolean;
        created_at: Date;
        updated_at: Date;
    },
    error?: string
}