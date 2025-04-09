export type CreateApiaristParams = {
  cpf: string;
  name: string;
  phone: string;
}

export type CreateApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    cpf: string;
    phone: string;
  },
  error?: string;
}

export type CreateApiaristRepositoryResponse = CreateApiaristServiceResponse