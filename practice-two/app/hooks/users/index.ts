import { ToastAndroid } from 'react-native'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { add, asyncStoreService, get } from '@services'
import { IAddress, ICard, IReturnError, IUser } from '@types'
import { useAuthStore, useOrderStore } from '@stores'

export const useLogin = (
  path: string
): UseMutationResult<
  IUser,
  AxiosError<IReturnError>,
  Pick<IUser, 'email' | 'password'>,
  unknown
> => {
  const loginFn = useAuthStore((state) => state.login)
  return useMutation<IUser, AxiosError<IReturnError>, Pick<IUser, 'email' | 'password'>, unknown>({
    mutationFn: (loginInfo: Pick<IUser, 'email' | 'password'>): Promise<IUser> =>
      add<IUser>(path, loginInfo),
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: async (data: IUser) => {
      ToastAndroid.show(`Welcome back ${data.lastName} ${data.firstName}!!!`, ToastAndroid.LONG)
      await asyncStoreService.save('user', data, () => loginFn(data))
    },
  })
}

export const useRegister = (
  path: string
): UseMutationResult<
  IUser,
  AxiosError<IReturnError>,
  Omit<IUser, 'id' | 'accessToken' | 'refreshToken'>,
  unknown
> => {
  const loginFn = useAuthStore((state) => state.login)

  return useMutation<
    IUser,
    AxiosError<IReturnError>,
    Omit<IUser, 'id' | 'accessToken' | 'refreshToken'>,
    unknown
  >({
    mutationFn: (data: Omit<IUser, 'id' | 'accessToken' | 'refreshToken'>): Promise<IUser> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = data

      return add<IUser>(path, rest)
    },
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: async (data: IUser) => {
      ToastAndroid.show('Register success!!!', ToastAndroid.LONG)
      await asyncStoreService.save('user', data, () => loginFn(data))
    },
  })
}

export const useAddAddress = (
  path: string
): UseMutationResult<IAddress, AxiosError<IReturnError>, Omit<IAddress, '_id'>, unknown> => {
  const addAddress = useOrderStore((state) => state.setAddress)

  return useMutation<IAddress, AxiosError<IReturnError>, Omit<IAddress, '_id'>, unknown>({
    mutationFn: (data: Omit<IAddress, '_id'>): Promise<IAddress> => add<IAddress>(path, data),
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: (data: IAddress) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...address } = data
      addAddress(address)
    },
  })
}

export const useGetCard = (path: string, userId: string): UseQueryResult<ICard[], Error> => {
  return useQuery<ICard[], Error, ICard[], string[]>({
    queryKey: ['cards', userId],
    queryFn: () => get<ICard[]>(path),
  })
}

export const useAddCard = (
  path: string
): UseMutationResult<ICard, AxiosError<IReturnError>, Omit<ICard, '_id'>, unknown> => {
  const queryClient = useQueryClient()
  const addCard = useOrderStore((state) => state.setCard)

  return useMutation<ICard, AxiosError<IReturnError>, Omit<ICard, '_id'>, unknown>({
    mutationFn: (data: Omit<ICard, '_id'>): Promise<ICard> => add<ICard>(path, data),
    onError: (error: AxiosError<IReturnError>) => {
      ToastAndroid.show(String(error.response?.data.message), ToastAndroid.LONG)
    },
    onSuccess: (data: ICard) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...card } = data
      ToastAndroid.show(`New payment card ${card.name} have add success!!`, ToastAndroid.SHORT)
      addCard(card)
      queryClient.setQueryData(['cards', user], (oldData: ICard[]) =>
        oldData ? [...oldData, data] : oldData
      )
    },
  })
}
