export type UpdateApiaristParams = {
  id: number;
  email: string;
  cpf: string;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
  active: boolean;
}

export type UpdateApiaristServiceResponse = {
  data?: {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    latitude: string;
    longitude: string;
    active: boolean;
  },
  error?: string;
}

export type UpdateApiaristRepositoryResponse = UpdateApiaristServiceResponse