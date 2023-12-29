import { useCallback, useEffect, useMemo } from 'react'
import { FlatList, Image, ListRenderItem } from 'react-native'
import { XStack, YStack } from 'tamagui'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useShallow } from 'zustand/react/shallow'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { Button, Heading, ProductCard, ProductCardPlaceHolder } from '@components'
import { useGetProductsByStore, useGetStores } from '@hooks'
import { useAuthStore, useCommonStore } from '@stores'
import { IProduct, IStore } from '@types'

import styles from './styles'

export type StoreHomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'ProductTab'>,
  NativeStackScreenProps<RootStackParamList>
>

type TPlaceHolder = { _id: string; placeholder: boolean }

const StoreHome = ({ navigation }: StoreHomeScreenProps) => {
  const [storeId, setStoreId] = useCommonStore(
    useShallow((state) => [state.storeId, state.setStoreId])
  )
  const user = useAuthStore((state) => state.user)
  const { data: userStore, isSuccess: isGetStoreSuccess } = useGetStores('api/stores', {
    params: { user: user?._id },
  })
  const { data: storeProducts, isSuccess: isGetStoreProductSuccess } = useGetProductsByStore(
    'api/products',
    userStore?.[0]._id || storeId
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMoveToCreateStore = useCallback(
    () => navigation.navigate('StoreStack', { screen: 'CreateStore' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleMoveToAddProduct = useCallback(
    () => navigation.navigate('StoreStack', { screen: 'AddProduct' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleMoveToStoreDetails = useCallback(
    () =>
      navigation.navigate('StoreStack', {
        screen: 'StoreProfile',
        params: { id: String(userStore?.[0]._id) },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const renderProductItem: ListRenderItem<IProduct<object> | TPlaceHolder> = useCallback(
    ({ item }) => {
      if (!isGetStoreProductSuccess) return null
      if ('placeholder' in item)
        return <ProductCardPlaceHolder onTouchPlaceHolder={handleMoveToAddProduct} />
      const { _id, img, price, discountPrice, name, store } = item

      return (
        <ProductCard
          id={String(_id)}
          img={{ uri: img }}
          price={price}
          discountPrice={discountPrice}
          title={name}
          avatar={{ uri: store.avatar }}
          storeName={store.name}
        />
      )
    },
    [isGetStoreProductSuccess, handleMoveToAddProduct]
  )
  const EmptyStore = useMemo(
    () => (
      <YStack marginVertical="$space.7" space="$space.5">
        <YStack alignItems="center" space="$space.5">
          <Image source={require('@assets/my_store/shop.png')} style={styles.headerImg} />
          <Heading
            fontWeight="$3"
            fontSize="$3"
            letterSpacing={-0.2}
            textAlign="center"
            textTransform="capitalize"
            content="You Don't Have a Store"
            color="$color.black"
            maxWidth={240}
          />
        </YStack>
        <Button
          title="Create store"
          marginHorizontal="$space.11"
          fontSize="$3"
          fontWeight="$3"
          lineHeight="$3"
          onPress={handleMoveToCreateStore}
        />
      </YStack>
    ),
    [handleMoveToCreateStore]
  )
  const renderStoreInfo = useCallback(
    ({ name, avatar }: IStore) => (
      <YStack backgroundColor="$color.white" marginBottom="$space.5">
        <YStack alignItems="center" space="$space.4.5" marginVertical="$space.6">
          <Image source={{ uri: avatar }} style={styles.storeAvatar} />
          <Heading content={`${name} store`} color="$color.gray_50" textTransform="capitalize" />
          <XStack space="$space.3">
            <Button
              title="Edit Store"
              variant="outline"
              shrink
              paddingHorizontal="$space.5"
              paddingVertical="$space.1.5"
              fontSize={12}
            />
            <Button
              title="View Store"
              shrink
              paddingHorizontal="$space.5"
              paddingVertical="$space.1.5"
              fontSize={12}
              onPress={handleMoveToStoreDetails}
            />
          </XStack>
        </YStack>
        <Button
          title="Remove store"
          variant="quaternary"
          color="$color.gray_50_alpha_50"
          borderTopColor="$color.gray_50_alpha_50"
          borderTopWidth={0.5}
        />
      </YStack>
    ),
    [handleMoveToStoreDetails]
  )
  const Products = useMemo(() => {
    if (!isGetStoreProductSuccess) return null
    if (!storeProducts.products.length)
      return (
        <YStack space="$space.6" paddingHorizontal="$space.11">
          <Heading
            content="You don't have product"
            marginTop="$space.8"
            textAlign="center"
            fontSize="$3"
            fontWeight="$3"
            letterSpacing={-0.165}
            color="$color.black"
          />
          <Button
            title="Add Product"
            variant="outline"
            fontSize="$3"
            fontWeight="$3"
            lineHeight="$3"
            onPress={handleMoveToAddProduct}
          />
        </YStack>
      )

    return (
      <FlatList
        keyExtractor={({ _id }: IProduct<object> | TPlaceHolder): string => _id}
        data={[...storeProducts.products, { _id: 'placeholder', placeholder: true }]}
        renderItem={renderProductItem}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.item}
        columnWrapperStyle={styles.column}
      />
    )
  }, [isGetStoreProductSuccess, storeProducts, handleMoveToAddProduct, renderProductItem])

  const Home = useMemo(() => {
    if (!isGetStoreSuccess) return null
    if (!userStore.length) return EmptyStore

    return (
      <>
        {renderStoreInfo(userStore[0])}
        {Products}
      </>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EmptyStore, Products, isGetStoreSuccess, renderStoreInfo, userStore])

  useEffect(() => {
    if (!isGetStoreSuccess) return

    setStoreId(userStore[0]._id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGetStoreSuccess])

  return Home
}

export default StoreHome
