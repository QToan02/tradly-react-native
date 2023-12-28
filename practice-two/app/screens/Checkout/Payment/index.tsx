import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import PagerView, { PagerViewOnPageSelectedEvent } from 'react-native-pager-view'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView, XStack, YStack } from 'tamagui'
import { useShallow } from 'zustand/react/shallow'

import { RootStackParamList } from '@navigation/Stack'
import { Address, PaymentCard, PaymentCardPlaceholder, Price, Radio, TabBar } from '@components'
import { PAYMENT_METHODS } from '@constants'
import { ICardBase, ICart, IOrder } from '@types'
import { useAuthStore, useCartStore, useOrderStore } from '@stores'
import { useGetCard, useOrderProduct } from '@hooks'

import styles from './styles'

export type PaymentScreenProps = NativeStackScreenProps<RootStackParamList, 'Payment'>

const Payment = ({ navigation }: PaymentScreenProps) => {
  const cart = useCartStore((state) => state.cart)
  const user = useAuthStore((state) => state.user)
  const { mutate, status } = useOrderProduct('api/order')
  const { data: cards, isSuccess: isGetCardsSuccess } = useGetCard('api/cards', String(user?._id))
  const [address, payment, setCard, setPaymentMethod] = useOrderStore(
    useShallow((state) => [state.address, state.card, state.setCard, state.setPaymentMethod])
  )
  const [selectedCard, setSelectedCard] = useState<string>('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<boolean>(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChangeAddress = useCallback(() => navigation.navigate('AddCard'), [])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const renderPagerIndex: React.JSX.Element[] = useMemo(() => {
    if (!isGetCardsSuccess) return []

    const listIndex: React.JSX.Element[] = []
    for (let i = 0; i <= cards.length; i += 1) {
      listIndex.push(
        <View key={i} style={[styles.dot, currentIndex === i ? styles.active : styles.normal]} />
      )
    }

    return listIndex
  }, [cards, currentIndex, isGetCardsSuccess])
  const handleViewPagerSelected = useCallback((e: PagerViewOnPageSelectedEvent) => {
    setCurrentIndex(e.nativeEvent.position)
  }, [])
  const handleCardSelected = useCallback((card: ICardBase) => {
    setSelectedCard(card.number)
    setCard(card)
    setSelectedPaymentMethod(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleAddCard = useCallback(() => navigation.navigate('AddCard'), [navigation])
  const ViewPager2 = useMemo(() => {
    if (!isGetCardsSuccess) return null

    return (
      <PagerView
        initialPage={0}
        style={styles.cardCarousel}
        onPageSelected={handleViewPagerSelected}
      >
        {[...cards, { isPlaceholder: true }].map((item) => (
          <View key={'_id' in item ? item._id : cards.length + 99}>
            {'_id' in item ? (
              <PaymentCard
                {...item}
                isSelected={item.number === selectedCard}
                alignSelf="center"
                onCardSelected={handleCardSelected}
              />
            ) : (
              <PaymentCardPlaceholder alignSelf="center" onTouchPlaceHolder={handleAddCard} />
            )}
          </View>
        ))}
      </PagerView>
    )
  }, [
    cards,
    handleAddCard,
    handleCardSelected,
    handleViewPagerSelected,
    isGetCardsSuccess,
    selectedCard,
  ])
  const handleCheckout = useCallback(() => {
    if (!user) return
    if (!cart.length) return
    const total = cart.reduce(
      (previousValue: number, { price, discountPrice, quantity }: ICart) => {
        if (discountPrice !== 0) return previousValue + discountPrice * quantity

        return previousValue + price * quantity
      },
      0
    )

    mutate(
      {
        productId: cart.map((item: ICart) => item._id),
        quantity: cart.map((item: ICart) => item.quantity),
        address: String(address?._id),
        payment: String(payment?._id),
        user: user._id,
        total,
      },
      {
        onSuccess: (data: IOrder) => {
          navigation.navigate('OrderDetail', { id: data._id })
        },
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, user])

  const handleSetPaymentMethod = useCallback(
    (value: string) => {
      setSelectedPaymentMethod(() => {
        if (value !== 'Debit / Credit Card') return true

        if (!selectedCard.length) return false

        return true
      })
      setPaymentMethod(value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCard]
  )

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack space="$space.3.5" backgroundColor="$color.bg_layer">
          <YStack justifyContent="center" backgroundColor="$color.white">
            {ViewPager2}
            <XStack
              marginBottom="$space.5"
              space="$space.3.5"
              alignItems="center"
              justifyContent="center"
            >
              {renderPagerIndex}
            </XStack>
          </YStack>
          <Radio
            radioList={PAYMENT_METHODS}
            backgroundColor="$color.white"
            onChangeValue={handleSetPaymentMethod}
          />
          <Address
            name={address?.name || 'Deliver to Tradly Team, 75119'}
            streetAddress={address?.streetAddress || 'Kualalumpur, Malaysia'}
            onPress={handleChangeAddress}
          />
          <Price data={cart} deliveryFee={0} />
        </YStack>
      </ScrollView>
      <TabBar
        title="Checkout"
        isDisable={!selectedPaymentMethod || status === 'pending'}
        onPress={handleCheckout}
      />
    </>
  )
}

export default Payment
