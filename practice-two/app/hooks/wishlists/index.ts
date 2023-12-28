import { AxiosResponse } from 'axios'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { add, get, remove } from '@services'
import { IWishlistBase } from '@types'

export const useGetWishlist = (
  path: string,
  userId: string
): UseQueryResult<IWishlistBase[], Error> => {
  return useQuery<IWishlistBase[], Error, IWishlistBase[], string[]>({
    queryKey: ['wishlist', userId],
    queryFn: () => get<IWishlistBase[]>(path, { params: { user: userId } }),
  })
}

export const useAddToWishlist = (
  path: string,
  userId: string
): UseMutationResult<IWishlistBase, Error, Omit<IWishlistBase, '_id'>, unknown> => {
  const queryClient = useQueryClient()

  return useMutation<IWishlistBase, Error, Omit<IWishlistBase, '_id'>, unknown>({
    mutationFn: (data: Omit<IWishlistBase, '_id'>): Promise<IWishlistBase> =>
      add<IWishlistBase>(path, data),
    onSuccess: (data: IWishlistBase) => {
      queryClient.setQueryData(['wishlist', userId], (oldData: IWishlistBase[]) =>
        oldData ? [...oldData, data] : oldData
      )
    },
  })
}

export const useDeleteFromWishlist = (
  path: string,
  userId: string
): UseMutationResult<AxiosResponse['status'], Error, Pick<IWishlistBase, '_id'>, unknown> => {
  const queryClient = useQueryClient()

  return useMutation<AxiosResponse['status'], Error, Pick<IWishlistBase, '_id'>, unknown>({
    mutationFn: ({ _id }: Pick<IWishlistBase, '_id'>): Promise<AxiosResponse['status']> =>
      remove(path, _id),
    onSuccess: (deleteStatus: number, { _id }: Pick<IWishlistBase, '_id'>) => {
      queryClient.setQueryData(['wishlist', userId], (oldData: IWishlistBase[]) =>
        deleteStatus === 200
          ? // eslint-disable-next-line no-underscore-dangle
            oldData.filter((value: IWishlistBase) => value._id !== _id)
          : oldData
      )
    },
  })
}
