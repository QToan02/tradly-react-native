import { create } from 'zustand'

import { ICategory } from '@types'

interface CommonState {
  storeId: string
  category: ICategory[]
  setStoreId: (id: string) => void
  setCategory: (items: ICategory[]) => void
}

export const useCommonStore = create<CommonState>()((set) => ({
  storeId: '',
  category: [],
  setStoreId: (id: string) => set({ storeId: id }),
  setCategory: (items: ICategory[]) => set({ category: items }),
}))

export default useCommonStore
