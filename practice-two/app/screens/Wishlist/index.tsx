import { Spinner } from 'tamagui'
import { useCallback } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/Stack'
import { ProductCard } from '@components'
import { useGetWishlist } from '@hooks'
import { useAuthStore } from '@stores'
import { IWishlistBase } from '@types'

import styles from './styles'

export type WishlistScreenProps = NativeStackScreenProps<RootStackParamList, 'Wishlist'>

const Wishlist = ({ navigation }: WishlistScreenProps) => {
  const user = useAuthStore((state) => state.user)
  const { data: wishlists, isSuccess } = useGetWishlist('api/wishlists', String(user?._id))
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

  return isSuccess ? (
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
  ) : (
    <Spinner size="large" color="$color.primary" />
  )
}

export default Wishlist
