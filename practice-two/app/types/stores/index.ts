import { IUser } from '../users'

export interface IStore<T = unknown> {
  _id: string
  name: string
  avatar: string
  description: string
  user: T extends object ? IUser : string
}

export interface IStoreForms extends Omit<IStore, '_id'> {
  type: string
  address: string
  city: string
  state: string
  country: string
  courierName: string
  tagline: string
}
