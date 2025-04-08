
export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}

export interface HttpRequest {
  body?: any
  headers?: any
  query?: any
  params?: any
  user: any
  files?: {
    file: FileInput[]
  } | any
}

export type FileInput = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  buffer: Buffer
  size: number
} | null;

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
  error?: T
  headers?: Record<string, string>
}
