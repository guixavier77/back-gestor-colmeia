export interface CreateUserParams {
    cpf: string
    email: string
    name: string
    phone: string
    active: boolean
    role: string
    password: string
}

export interface UserUpdate extends CreateUserParams {
    id: number;
}


export type  CreateUserServiceResponse  = {

    data?: {
        id: number;
        cpf: string
        name: string
        email: string
        phone: string
        active: boolean
        role: string
        password: string
        created_at: Date
        updated_at: Date
    }
    error?: string
}

export type CreateUserRepositoryResponse = CreateUserServiceResponse
