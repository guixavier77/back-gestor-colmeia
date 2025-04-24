
type LogLevel = 'INFO' | 'ERROR' | 'WARN'

export type LogServiceParams = {
  id?: string
  level: string,
  message: string,
  context?: string,
  data?: string,
  method?: string,
  url?: string,
  statusCode?: number,
}