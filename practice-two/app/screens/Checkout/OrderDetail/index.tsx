import { useCallback, useMemo } from 'react'
import { Dimensions, Image } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, Separator, Spinner, XStack, YStack } from 'tamagui'

import { Button, CartItem, Heading, Paragraph, TrackerItem } from '@components'
import { RootStackParamList } from '@navigation/Stack'
import { IProductReturnByOrder } from '@types'
import { useGetOderDetail } from '@hooks'

export type OrderDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderDetail'>

const OrderDetail = ({ navigation, route }: OrderDetailScreenProps) => {
  const { id } = route.params
  const { data: orderData, isSuccess } = useGetOderDetail('api/order', id)

  const handleNavigateToHome = useCallback(
    () => navigation.navigate('Tabs', { screen: 'HomeTab' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const renderOrderItem = useMemo(() => {
    if (!isSuccess) return null

    return orderData.product.map(
      ({ _id, name, img, price, discountPrice, quantity }: IProductReturnByOrder) => {
        if (!_id || !img || !name || !price || !quantity) return null

        return (
          <CartItem
            key={_id}
            image={{ uri: img }}
            name={name}
            price={price}
            discountPrice={discountPrice}
            quantity={quantity}
          />
        )
      }
    )
  }, [isSuccess, orderData])

  return isSuccess ? (
    <ScrollView showsVerticalScrollIndicator={false} backgroundColor="$color.bg_layer">
      <YStack alignItems="center" paddingVertical="$space.6">
        <Image source={require('@assets/order/done.png')} />
        <Heading content="Thanks for Order" color="$color.gray_50" />
      </YStack>
      <YStack>{renderOrderItem}</YStack>
      <YStack
        marginTop="$space.3.5"
        marginBottom="$space.5"
        paddingLeft="$space.4.5"
        paddingRight="$space.3.5"
        backgroundColor="$color.white"
      >
        <YStack marginVertical="$space.3" space="$space.2.5">
          <Heading
            content="track order"
            fontWeight="$3"
            lineHeight="$4"
            fontSize="$2"
            color="$color.gray_50"
            textTransform="capitalize"
          />
          <Paragraph
            content={`Order ID - ${orderData._id}`}
            fontWeight="$2"
            color="$color.gray_400"
            lineHeight="$3"
          />
        </YStack>
        <Separator borderColor="$color.primary" borderBottomWidth={3} width={70} />
        <YStack marginTop="$space.5" marginBottom="$space.3" space="$space.7">
          <TrackerItem
            trackStatus="order placed"
            description="Order placed success"
            datetime={orderData.createdAt}
          />
          <TrackerItem
            trackStatus="payment confirmed"
            description={`Payment confirmed with ${orderData.payment.name} card`}
            datetime={orderData.createdAt}
          />
          <TrackerItem
            trackStatus="processed"
            description="Store is processed your order"
            datetime={orderData.createdAt}
          />
          <TrackerItem
            trackStatus="delivered"
            description="Delivered Status"
            datetime={orderData.status !== 'delivered' ? '' : orderData.updatedAt}
          />
        </YStack>
      </YStack>
      <YStack
        paddingVertical="$space.3"
        paddingHorizontal="$space.4"
        backgroundColor="$color.white"
      >
        <Heading
          content="delivery address"
          fontWeight="$3"
          lineHeight="$4"
          fontSize="$2"
          color="$color.gray_50"
          textTransform="capitalize"
        />
        <Separator
          marginTop="$space.3"
          marginLeft="$space.-3"
          borderColor="$color.divider"
          width={Dimensions.get('window').width}
        />
        <YStack paddingVertical="$space.3" space="$space.2.5">
          <Paragraph content="Tradly team" fontWeight="$2" color="$color.dark_50" lineHeight="$3" />
          <Paragraph
            content={`${orderData.address.streetAddress} ${orderData.address.city} ${orderData.address.state}`}
            fontWeight="$2"
            fontSize={12}
            color="$color.gray_400"
            lineHeight="$3"
          />
          <XStack alignItems="center" space="$space.1.5">
            <Paragraph
              content="Mobile: "
              fontWeight="$2"
              fontSize={12}
              color="$color.gray_400"
              lineHeight="$3"
            />
            <Paragraph
              content={orderData.address.phone}
              fontWeight="$2"
              fontSize={12}
              color="$color.dark_50"
              lineHeight="$3"
            />
          </XStack>
        </YStack>
      </YStack>
      <Button
        variant="quaternary"
        backgroundColor="$color.transparent"
        borderColor="$color.transparent"
        title="Back to Home"
        marginTop="$space.3.5"
        marginBottom="$space.7"
        fontWeight="$3"
        fontSize="$1"
        lineHeight="$4"
        color="$color.dark_50"
        textTransform="none"
        onPress={handleNavigateToHome}
      />
    </ScrollView>
  ) : (
    <Spinner size="large" color="$color.primary" />
  )
}

export default OrderDetail
