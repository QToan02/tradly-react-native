import { ICardBase, IDetailInfo, IFlatListBase } from '@types'

const PRICE_DETAILS: IDetailInfo[] = [
  { id: 1, label: 'price (1 item)', value: '$25' },
  { id: 2, label: 'delivery fee', value: 'info' },
]

export type ICardItem = IFlatListBase & ICardBase

const CARDS: ICardItem[] = [
  {
    id: '1',
    name: 'Tradly Team',
    number: '5627215898548869',
    cvc: '111',
    expired: '01/2019',
  },
  {
    id: '2',
    name: 'Tradly Team',
    number: '4627215898548869',
    cvc: '123',
    expired: '12/2023',
  },
]

export default { PRICE_DETAILS, CARDS }
