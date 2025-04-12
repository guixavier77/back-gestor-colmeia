export type PeriodStat = {
  totalAssociates: number;
  totalDisassociated: number;
};


export type GetApiaristStatsByPeriodServiceResponse = {
  data?: {
    month: PeriodStat;
    week: PeriodStat;
    year: PeriodStat;
  },
  error?: string;
}

export type GetApiaristStatsByPeriodRepositoryResponse = GetApiaristStatsByPeriodServiceResponse