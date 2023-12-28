import { useCallback, useMemo } from 'react'
import { ScrollView, Spinner, YStack } from 'tamagui'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { Heading, OrderItem } from '@components'
import { useGetAllOrders } from '@hooks'
import { useAuthStore } from '@stores'
import { IOrderReturn } from '@types'

export type OrderHistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'OrderHistoryTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const OrderHistory = ({ navigation }: OrderHistoryScreenProps) => {
  const user = useAuthStore((state) => state.user)
  const { data: orders, isSuccess } = useGetAllOrders('api/orders', String(user?._id))
  const handlePress = useCallback((id: string) => {
    navigation.navigate('OrderHistoryStack', { screen: 'OrderDetail', params: { id } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderOrders = useMemo(() => {
    if (!isSuccess) return null

    return orders.map(({ _id, product, total, status }: IOrderReturn<string>) => (
      <OrderItem
        key={_id}
        _id={_id}
        image={{ uri: product[0].img }}
        name={product[0].name}
        price={total}
        orderStatus={status}
        onPressOrder={handlePress}
      />
    ))
  }, [handlePress, isSuccess, orders])

  return isSuccess ? (
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
        paddingLeft="$space.2.5"
      />
      <YStack space="$space.2">{renderOrders}</YStack>
    </ScrollView>
  ) : (
    <Spinner size="large" color="$color.primary" />
  )
}

export default OrderHistory
