import { ComponentMeta, ComponentStory } from '@storybook/react-native'

import { OrderItem } from '../index'

export default {
  title: 'components/Order Item',
  component: OrderItem,
} as ComponentMeta<typeof OrderItem>

const Template: ComponentStory<typeof OrderItem> = (args) => <OrderItem {...args} />

export const Default = Template.bind({})
Default.args = {
  image: require('@assets/cart/item.png'),
  name: 'coca cola',
  price: 50,
  orderStatus: 'delivered',
}

export const Item = Template.bind({})
Item.args = {
  image: require('@assets/store/tradly.png'),
  name: 'vegetables',
  price: 100,
  discountPrice: 2,
  orderStatus: 'cancelled',
}
