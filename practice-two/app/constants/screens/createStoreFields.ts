import { InputProps } from '@components/Input'

export type TStoreFields = Pick<InputProps, 'label' | 'name' | 'rules'> & {
  id: string
}

const CREATE_STORE_FIELDS: TStoreFields[] = [
  {
    id: '1',
    label: 'Store Name',
    name: 'storeName',
    rules: {
      required: 'Please enter name for your store',
    },
  },
  {
    id: '2',
    label: 'Store Web Address',
    name: 'storeWebAddress',
    rules: {
      required: 'Please provide store web address',
    },
  },
  {
    id: '3',
    label: 'Store Description',
    name: 'storeDescription',
  },
  {
    id: '4',
    label: 'Store Type',
    name: 'storeType',
    rules: {
      required: 'Please provide the type of store',
    },
  },
  {
    id: '5',
    label: 'Address',
    name: 'address',
    rules: {
      required: 'Please add address for store',
    },
  },
  {
    id: '6',
    label: 'City',
    name: 'city',
  },
  {
    id: '7',
    label: 'State',
    name: 'state',
  },
  {
    id: '8',
    label: 'Country',
    name: 'country',
  },
  {
    id: '9',
    label: 'Courier Name',
    name: 'courierName',
  },
  {
    id: '10',
    label: 'Tagline',
    name: 'tagline',
  },
]

export default CREATE_STORE_FIELDS
