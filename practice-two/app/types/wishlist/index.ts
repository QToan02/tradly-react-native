import { IProductBase } from '../products'
import { IUser } from '../users'

export interface IWishlistBase {
  _id: string
  product: string
  user: string
}
