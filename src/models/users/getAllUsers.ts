export type GetAllUsersServiceResponse = {
  data?: {
    id: number;
    name: string;
    phone: string;
    cpf: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    active: boolean;
  }[],
  error?: string;
}

export type GetAllUsersRepositoryResponse = GetAllUsersServiceResponse