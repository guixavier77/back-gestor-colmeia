export type UpdateApiaristParams = {
  id: number;
  cpf: string;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
}

export type UpdateApiaristServiceResponse = {
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

export type UpdateApiaristRepositoryResponse = UpdateApiaristServiceResponse