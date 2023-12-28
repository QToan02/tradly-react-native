export type TAsyncStoreReturnType = 'string' | 'object'

export interface IReturnResponse<TData> {
  success: boolean
  message: string
  data: TData
}

export interface IReturnError {
  success: boolean
  message: string
}
