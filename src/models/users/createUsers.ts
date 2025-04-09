export type CreateUserServiceParams = {
    cpf: string
    email: string
    name: string
    phone: string
    active: boolean
    role: string
    password: string
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
