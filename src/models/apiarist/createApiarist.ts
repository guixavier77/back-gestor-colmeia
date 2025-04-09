export type CreateApiaristParams = {
  cpf: string;
  name: string;
}

export type CreateApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    cpf: string;
  },
  error?: string;
}

export type CreateApiaristRepositoryResponse = CreateApiaristServiceResponse