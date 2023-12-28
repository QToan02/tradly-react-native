import { IAddress, ICard, IUser } from '../users'
import { ICategory } from '../categories'
import { IStore } from '../stores'

export type TOrderStatus =
  | 'order placed'
  | 'payment confirmed'
  | 'processed'
  | 'delivered'
  | 'cancelled'

export interface IProductBase {
  _id: string
  storeId: number
  categoryId: number
  name: string
  price: number
  discountPrice: number
  description: string
  condition: string
  priceType: string
  location: string
  delivery: string
  img: string
}

export interface ICart extends IProductBase {
  quantity: number
}

export interface IProduct<T = object> extends IProductBase {
  store: T extends object ? IStore : string
  category: T extends object ? ICategory : string
}

export interface IPaginationProduct {
  currentPage: string
  totalPages: string
  totalProducts: string
  pageSize: string
  products: IProduct[]
}

export interface IOrderStatus {
  id: number
  status: string
}

export interface IOrder<T = unknown> {
  _id: string
  productId: Array<ICart['_id']>
  quantity: Array<ICart['quantity']>
  address: T extends object ? IAddress : string
  payment: T extends object ? ICard : string
  total: number
  user: IUser['_id']
}

export interface IProductReturnByOrder
  extends Pick<ICart, '_id' | 'name' | 'img' | 'price' | 'discountPrice' | 'quantity'> {}

export interface IOrderReturn<TPopulate = object>
  extends Omit<IOrder<TPopulate>, 'productId' | 'quantity'> {
  product: IProductReturnByOrder[]
  rating: number
  status: TOrderStatus
  createdAt: string
  updatedAt: string
}

export interface IAddProductForm {
  productName: string
  productImg: string
  categoryProduct: string
  price: number
  offerPrice: number
  locationDetails: string
  productDescription: string
  condition: string
  priceType: string
  additionalDetails: string
}
