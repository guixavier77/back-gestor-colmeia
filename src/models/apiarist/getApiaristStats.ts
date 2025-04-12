
export type GetApiaristStatsServiceResponse = {
  data?: {
    totalAssociates: number;
    totalDisassociated: number;
  },
  error?: string;
}

export type GetApiaristStatsRepositoryResponse = GetApiaristStatsServiceResponse