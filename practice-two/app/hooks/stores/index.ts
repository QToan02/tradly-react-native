import { ToastAndroid } from 'react-native'
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig } from 'axios'
import QueryString from 'qs'

import { add, find, get } from '@services'
import {
  IAddProductForm,
  IPaginationProduct,
  IProduct,
  IReturnError,
  IStore,
  IStoreForms,
} from '@types'
import { useCommonStore } from '@stores'

export const useGetStores = (
  path: string,
  optional: AxiosRequestConfig = {}
): UseQueryResult<IStore[], Error> => {
  return useQuery<IStore[], Error, IStore[], string[]>({
    queryKey: ['stores'],
    queryFn: () => get<IStore[]>(path, optional),
  })
}

export const useFindStore = (path: string, id: string): UseQueryResult<IStore, Error> => {
  return useQuery<IStore, Error, IStore, string[]>({
    queryKey: ['stores', id],
    queryFn: () => find<IStore>(`${path}/${id}`),
  })
}

export const useAddStore = (
  path: string
): UseMutationResult<IStore, AxiosError<IReturnError>, IStoreForms, unknown> => {
  const set = useCommonStore((state) => state.setStoreId)

  return useMutation<IStore, AxiosError<IReturnError>, IStoreForms, unknown>({
    mutationFn: (data: IStoreForms): Promise<IStore> => add<IStore>(path, data),
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: ({ name, _id }: IStore) => {
      set(_id)
      ToastAndroid.show(`Create store ${name} success!!!`, ToastAndroid.LONG)
    },
  })
}

export const useGetProductsByStore = (
  path: string,
  storeId: string | undefined
): UseQueryResult<IPaginationProduct, AxiosError<IReturnError>> => {
  return useQuery<IPaginationProduct, AxiosError<IReturnError>, IPaginationProduct, string[]>({
    enabled: !!storeId,
    queryKey: ['products', 'store', String(storeId)],
    queryFn: () =>
      get<IPaginationProduct>(path, {
        params: {
          _expand: ['store', 'category'],
          store: storeId,
        },
        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
      }),
  })
}

export const useAddProduct = (
  path: string
): UseMutationResult<IProduct, AxiosError<IReturnError>, IAddProductForm, unknown> => {
  return useMutation<IProduct, AxiosError<IReturnError>, IAddProductForm, unknown>({
    mutationFn: (data: IAddProductForm): Promise<IProduct> =>
      add<IProduct, IAddProductForm>(path, data),
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: ({ name }: IProduct) => {
      ToastAndroid.show(`Create product ${name} success!!!`, ToastAndroid.LONG)
    },
  })
}
