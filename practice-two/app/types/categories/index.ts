export type TCategoryName =
  | 'beverages'
  | 'bread & bakery'
  | 'vegetables'
  | 'fruit'
  | 'egg'
  | 'frozen veg'
  | 'homecare'
  | 'pet care'

export interface ICategory {
  _id: string
  name: TCategoryName
}
