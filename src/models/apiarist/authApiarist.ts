


export type AuthApiaristServiceResponse = {
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
        latitude: string;
        longitude: string;
    }
    token?: string;
    error?: string;
}

export type AuthApiaristRepositoryResponse = {
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
        latitude: string;
        longitude: string;
    },
    error?: string
}