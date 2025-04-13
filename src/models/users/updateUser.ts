export type UpdateUserParams = {
  id: number;
  email: string;
  cpf: string;
  name: string;
  phone: string;
  active: boolean;
}

export type UpdateUserServiceResponse = {
  data?: {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    active: boolean;
  },
  error?: string;
}

export type UpdateUserRepositoryResponse = UpdateUserServiceResponse