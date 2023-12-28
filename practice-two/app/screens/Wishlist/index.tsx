import { Spinner, YStack } from 'tamagui'
import { useCallback, useMemo } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/Stack'
import { Heading, Paragraph, ProductCard } from '@components'
import { useGetWishlist } from '@hooks'
import { useAuthStore } from '@stores'
import { IWishlistBase } from '@types'

import styles from './styles'

export type WishlistScreenProps = NativeStackScreenProps<RootStackParamList, 'Wishlist'>

const Wishlist = ({ navigation }: WishlistScreenProps) => {
  const user = useAuthStore((state) => state.user)
  const {
    data: wishlists,
    isSuccess,
    isLoading,
  } = useGetWishlist('api/wishlists', String(user?._id))
  const handleMoveToProduct = useCallback((id: string) => {
    navigation.navigate('ProductDetail', { id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderProductItem: ListRenderItem<IWishlistBase<object>> = useCallback(
    ({ item }) => {
      if (!isSuccess) return null
      const {
        product: { _id, img, price, discountPrice, name, store },
      } = item

      return (
        <ProductCard
          id={String(_id)}
          img={{ uri: img }}
          price={price}
          discountPrice={discountPrice}
          title={name}
          avatar={{ uri: store.avatar }}
          storeName={store.name}
          onPressCard={handleMoveToProduct}
        />
      )
    },
    [isSuccess, handleMoveToProduct]
  )
  const Item = useMemo(() => {
    if (isLoading) return <Spinner size="large" color="$color.primary" />
    if (!isSuccess) return null
    if (!wishlists.length)
      return (
        <YStack paddingVertical="$space.4" paddingHorizontal="$space.10">
          <Heading
            content="List empty!!!!"
            color="$color.dark_50"
            fontWeight="$3"
            fontSize="$3"
            textAlign="center"
          />
          <Paragraph
            content="Add your favorites products"
            color="$color.gray_50"
            fontSize="$2"
            fontWeight="$2"
            textAlign="center"
          />
        </YStack>
      )

    return (
      <FlatList
        keyExtractor={({ _id }: IWishlistBase): string => _id}
        data={wishlists}
        renderItem={renderProductItem}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.item}
        columnWrapperStyle={styles.column}
      />
    )
  }, [isLoading, isSuccess, renderProductItem, wishlists])

  return (
    <YStack flex={1} backgroundColor="$color.bg_layer">
      {Item}
    </YStack>
  )
}

export default Wishlist
