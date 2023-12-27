import { ScrollView, YStack } from 'tamagui'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { Heading, OrderItem } from '@components'

export type OrderHistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'OrderHistoryTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const OrderHistory = () => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      space
      paddingTop="$space.5"
      backgroundColor="$color.bg_layer"
    >
      <Heading
        content="Transactions"
        color="$color.dark_50"
        fontSize={20}
        lineHeight={28}
        letterSpacing={0.4}
      />
      <YStack space="$space.2">
        <OrderItem
          image={require('@assets/cart/item.png')}
          name="coca cola"
          price={50}
          orderStatus="delivered"
        />
        <OrderItem
          image={require('@assets/cart/item.png')}
          name="coca cola"
          price={50}
          orderStatus="payment confirmed"
        />
        <OrderItem
          image={require('@assets/store/tradly.png')}
          name="vegetables"
          price={100}
          discountPrice={2}
          orderStatus="cancelled"
        />
        <OrderItem
          image={require('@assets/cart/item.png')}
          name="coca cola"
          price={50}
          orderStatus="delivered"
        />
        <OrderItem
          image={require('@assets/cart/item.png')}
          name="coca cola"
          price={50}
          orderStatus="payment confirmed"
        />
        <OrderItem
          image={require('@assets/store/tradly.png')}
          name="vegetables"
          price={100}
          discountPrice={2}
          orderStatus="cancelled"
        />
        <OrderItem
          image={require('@assets/cart/item.png')}
          name="coca cola"
          price={50}
          orderStatus="delivered"
        />
        <OrderItem
          image={require('@assets/cart/item.png')}
          name="coca cola"
          price={50}
          orderStatus="payment confirmed"
        />
        <OrderItem
          image={require('@assets/store/tradly.png')}
          name="vegetables"
          price={100}
          discountPrice={2}
          orderStatus="cancelled"
        />
      </YStack>
    </ScrollView>
  )
}

export default OrderHistory
