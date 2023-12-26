import { ComponentMeta, ComponentStory } from '@storybook/react-native'

import { ProductCardPlaceHolder } from '../index'

export default {
  title: 'components/Product Card Place Holder',
  component: ProductCardPlaceHolder,
} as ComponentMeta<typeof ProductCardPlaceHolder>

const Template: ComponentStory<typeof ProductCardPlaceHolder> = () => <ProductCardPlaceHolder />

export const Default = Template.bind({})
Default.args = {}
