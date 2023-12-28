export interface IUser {
  id: number
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  avatar: string
  accessToken: string
  refreshToken: string
  confirmPassword: string
}

export type TLoginForm = Pick<IUser, 'email' | 'phone' | 'password'>

export interface IAddressBase {
  _id: string
  name: string
  phone: string
  streetAddress: string
  city: string
  state: string
  zipCode: number
}

export interface IAddress extends IAddressBase {
  user: unknown extends object ? IUser : string
}

export interface ICardBase {
  _id: string
  number: string
  name: string
  expired: string
  cvc: string
}

export interface ICard extends ICardBase {
  user: unknown extends object ? IUser : string
}

export interface IUserForms extends IUser, TLoginForm, IAddressBase, ICardBase {}
