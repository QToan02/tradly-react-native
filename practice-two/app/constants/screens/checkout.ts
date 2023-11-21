import { ICardInformation, IDetailInfo, IFlatListBase } from '@types'

const PRICE_DETAILS: IDetailInfo[] = [
  { id: 1, label: 'price (1 item)', value: '$25' },
  { id: 2, label: 'delivery fee', value: 'info' },
]

export type ICardItem = IFlatListBase & ICardInformation

const CARDS: ICardItem[] = [
  {
    id: '1',
    name: 'Tradly Team',
    cardNumber: '5627215898548869',
    cvc: '111',
    expires: '01/2019',
  },
  {
    id: '2',
    name: 'Tradly Team',
    cardNumber: '4627215898548869',
    cvc: '123',
    expires: '12/2023',
  },
]

export default { PRICE_DETAILS, CARDS }
