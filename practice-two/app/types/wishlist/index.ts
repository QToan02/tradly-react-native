import { IProduct } from '../products'
import { IUser } from '../users'

export interface IWishlistBase<T = object> {
  _id: string
  product: T extends object ? IProduct : string
  user: T extends object ? IUser : string
}
