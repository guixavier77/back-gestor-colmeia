
type ApiaristLatest = {
  id: number,
  name: string,
  cpf: string
  date: Date,
} 

export type GetApiaristLatestServiceResponse = {
  data?: {
    latestDisassociated: ApiaristLatest[];
    latestAssociated: ApiaristLatest[];
  },
  error?: string;
}

export type GetApiaristLatestRepositoryResponse = GetApiaristLatestServiceResponse