import { InputProps } from '@components/Input'

export type TStoreFields = Pick<InputProps, 'label' | 'name' | 'rules'> & {
  id: string
}

const CREATE_STORE_FIELDS: TStoreFields[] = [
  {
    id: '1',
    label: 'Store Name',
    name: 'name',
    rules: {
      required: 'Please enter name for your store',
    },
  },
  {
    id: '2',
    label: 'Store Avatar',
    name: 'avatar',
  },
  {
    id: '3',
    label: 'Store Description',
    name: 'description',
  },
  {
    id: '4',
    label: 'Store Type',
    name: 'type',
  },
  {
    id: '5',
    label: 'Address',
    name: 'address',
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
