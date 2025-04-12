export type UpdatePasswordApiaristParams = {
  apiaristId: number;
  password: string;
  confirmPassword: string;
}

export type UpdatePasswordApiaristServiceResponse = {
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

export type UpdateApiaristRepositoryResponse = UpdatePasswordApiaristServiceResponse