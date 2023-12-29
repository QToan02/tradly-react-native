import { ToastAndroid } from 'react-native'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import * as Notifications from 'expo-notifications'
import * as ExpoLinking from 'expo-linking'
import QueryString from 'qs'
import { AxiosError, AxiosRequestConfig } from 'axios'

import { add, find, get } from '@services'
import { ICategory, IOrder, IOrderReturn, IPaginationProduct, IProduct, IReturnError } from '@types'
import { useCartStore } from '@stores'

export const useGetProducts = (
  path: string
): UseQueryResult<IPaginationProduct, AxiosError<IReturnError>> => {
  return useQuery<IPaginationProduct, AxiosError<IReturnError>, IPaginationProduct, string[]>({
    queryKey: ['products'],
    queryFn: () =>
      get<IPaginationProduct>(path, {
        params: {
          _expand: ['store', 'category'],
        },
        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
      }),
  })
}

export const useFindProduct = (
  path: string,
  id: string
): UseQueryResult<IProduct, AxiosError<IReturnError>> => {
  return useQuery<IProduct, AxiosError<IReturnError>, IProduct, string[]>({
    queryKey: ['products', id],
    queryFn: () =>
      find<IProduct>(`${path}/${id}`, {
        params: {
          _expand: ['store', 'category'],
        },
        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
      }),
  })
}

export const useOrderProduct = (
  path: string
): UseMutationResult<IOrder, AxiosError<IReturnError>, Omit<IOrder, '_id'>, unknown> => {
  const clearCart = useCartStore((state) => state.clear)

  return useMutation<IOrder, AxiosError<IReturnError>, Omit<IOrder, '_id'>, unknown>({
    mutationFn: (data: Omit<IOrder, '_id'>): Promise<IOrder> => add<IOrder>(path, { ...data }),
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: (data: IOrder) => {
      clearCart()
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Order successfully',
          body: `Order #${data._id} is being processed by store`,
          data: {
            redirect: `${ExpoLinking.createURL('/')}home/orders/${data._id}`,
          },
        },
        trigger: null,
      })
    },
  })
}

export const useGetOderDetail = (path: string, id: string): UseQueryResult<IOrderReturn, Error> => {
  return useQuery<IOrderReturn, Error>({
    queryKey: ['orders', id],
    queryFn: () => find<IOrderReturn>(`${path}/${id}`),
  })
}

export const useGetAllOrders = (
  path: string,
  id: string
): UseQueryResult<IOrderReturn<string>[], Error> => {
  return useQuery<IOrderReturn<string>[], Error>({
    queryKey: ['orders'],
    queryFn: () =>
      get<IOrderReturn<string>[]>(`${path}`, {
        params: { user: id },
      }),
  })
}

export const useGetCategories = (
  path: string,
  optional: AxiosRequestConfig = {}
): UseQueryResult<ICategory[], Error> => {
  return useQuery<ICategory[], Error, ICategory[], string[]>({
    queryKey: ['categories'],
    queryFn: () => get<ICategory[]>(path, optional),
  })
}

export const useGetProductsByCategory = (
  path: string,
  categoryId: string
): UseQueryResult<IPaginationProduct, AxiosError<IReturnError>> => {
  return useQuery<IPaginationProduct, AxiosError<IReturnError>, IPaginationProduct, string[]>({
    queryKey: ['products', 'category', String(categoryId)],
    queryFn: () =>
      get<IPaginationProduct>(path, {
        params: {
          _expand: ['store', 'category'],
          category: categoryId,
        },
        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
      }),
  })
}

export const useSearchProduct = (
  path: string,
  search: string
): UseQueryResult<IPaginationProduct, AxiosError<IReturnError>> => {
  return useQuery<IPaginationProduct, AxiosError<IReturnError>, IPaginationProduct, string[]>({
    enabled: !!search.length,
    queryKey: ['products'],
    queryFn: () =>
      get<IPaginationProduct>(path, {
        params: {
          _expand: ['store', 'category'],
        },
        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
      }),
  })
}
