import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IReturnResponse } from '@types'

const request: AxiosInstance = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: 'http://10.0.2.2:5050',
})

export const get = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<T> => {
  const res: AxiosResponse<IReturnResponse<T>> = await request.get(path, options).catch((error) => {
    throw error
  })

  return res.data.data
}

export const find = async <T>(path: string, options: AxiosRequestConfig = {}): Promise<T> => {
  const res: AxiosResponse<IReturnResponse<T>> = await request.get(path, options).catch((error) => {
    throw error
  })

  return res.data.data
}

export const add = async <T, TOptions = T>(
  path: string,
  options: Partial<TOptions>
): Promise<T> => {
  const res: AxiosResponse<IReturnResponse<T>> = await request
    .post(path, options)
    .catch((error) => {
      throw error
    })

  return res.data.data
}

export const edit = async <T>(path: string, id: number, options: Partial<T>): Promise<T> => {
  const res: AxiosResponse<IReturnResponse<T>> = await request
    .patch(`${path}/${id}`, options)
    .catch((error) => {
      throw error
    })

  return res.data.data
}

export const remove = async (
  path: string,
  id: number | string
): Promise<AxiosResponse['status']> => {
  const res = await request.delete(`${path}/${id}`).catch((error) => {
    throw error
  })

  return res.status
}
