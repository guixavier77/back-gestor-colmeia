export type GetAllApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    cpf: string;
    phone: string
  }[],
  error?: string;
}

export type GetAllApiaristRepositoryResponse = GetAllApiaristServiceResponse