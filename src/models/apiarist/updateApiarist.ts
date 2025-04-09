export type UpdateApiaristParams = {
  id: number;
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
    cpf: string;
    phone: string;
    latitude: string;
    longitude: string;
    active: boolean;
  },
  error?: string;
}

export type UpdateApiaristRepositoryResponse = UpdateApiaristServiceResponse