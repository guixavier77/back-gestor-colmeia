export type CreateApiaristParams = {
  cpf: string;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
  email: string;
  password: string;
}

export type CreateApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    latitude: string;
    longitude: string;
  },
  error?: string;
}

export type CreateApiaristRepositoryResponse = CreateApiaristServiceResponse