import { ImageProps } from 'react-native'

import { IUserForms } from '../users'

export interface IInputSearch {
  search: string
}

export interface IForm extends IInputSearch, IUserForms {}

export type TButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

export type TSize = 'sm' | 'md' | 'lg' | 'xl'

export interface IIconList {
  label: string
  icon: ImageProps['source']
  action: () => void
}

export type TAlignAvatar = 'inline' | 'block'

export type TCard = 'visa' | 'mastercard' | 'normal'

export interface IRadioItem {
  id: string
  name: string
}

export type TTrackerStatus = 'order placed' | 'payment confirmed' | 'processed' | 'delivered'

export interface IDropDownItem {
  id: string
  name: string
  value: string
}
