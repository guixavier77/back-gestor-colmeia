export type GetAllApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    phone: string;
    cpf: string;
    latitude: string;
    longitude: string;
    created_at: Date;
    updated_at: Date;
    active: boolean;
  }[],
  error?: string;
}

export type GetAllApiaristRepositoryResponse = GetAllApiaristServiceResponse