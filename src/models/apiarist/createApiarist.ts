export type CreateApiaristParams = {
  cpf: string;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
}

export type CreateApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    latitude: string;
    longitude: string;
  },
  error?: string;
}

export type CreateApiaristRepositoryResponse = CreateApiaristServiceResponse