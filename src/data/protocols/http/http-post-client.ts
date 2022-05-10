import { HttpResponse } from '.'

export interface HttpPostParams {
  url: string
  body?: any
}

export interface HttpPostClient<R = any> {
  post: (params: HttpPostParams) => Promise<HttpResponse<R>>
}
