import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { ImageSourcePropType } from 'react-native'
import { XStack, XStackProps, YStack } from 'tamagui'

import Paragraph from '@components/Paragraph'
import Button from '@components/Button'
import { calculateDiscount } from '@utils'
import { TOrderStatus } from '@types'

import { StyledImage, StyledText } from './styles'

export type OrderItemProps = XStackProps & {
  image: ImageSourcePropType
  name: string
  price: number
  orderStatus: TOrderStatus
  discountPrice?: number
}

const OrderItem = ({
  image,
  name,
  price,
  orderStatus,
  discountPrice = 0,
  ...rest
}: OrderItemProps) => {
  return (
    <XStack
      padding="$space.3.5"
      backgroundColor="$color.white"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="$radius.true"
      pressStyle={{ opacity: 0.5 }}
      {...rest}
    >
      <XStack space="$space.3.5">
        <StyledImage source={image} />
        <YStack justifyContent="center">
          <StyledText content={name} color="$color.dark_50" />
          <XStack alignItems="baseline" columnGap="$space.1.5">
            <Paragraph
              content={`$${discountPrice ? discountPrice.toFixed(0) : price.toFixed(0)}`}
              fontWeight="$4"
              fontSize="$2"
              lineHeight="$4"
              color="$color.primary"
              numberOfLines={1}
            />
            {discountPrice !== 0 && (
              <XStack space="$space.1.5" opacity={0.7}>
                <StyledText
                  content={`$${price.toFixed(0)}`}
                  textDecorationLine="line-through"
                  fontSize={12}
                  numberOfLines={1}
                />
                <StyledText
                  content={calculateDiscount(price, discountPrice)}
                  numberOfLines={1}
                  fontSize={12}
                />
              </XStack>
            )}
          </XStack>
        </YStack>
      </XStack>
      <Button
        title={orderStatus}
        shrink
        alignSelf="center"
        variant={orderStatus === 'delivered' ? 'primary' : 'outline'}
        paddingHorizontal="$space.5"
        paddingVertical="$space.1.5"
        fontSize={12}
        pressStyle={{ opacity: 1 }}
      />
    </XStack>
  )
}

export default memo(OrderItem, isEqual)
