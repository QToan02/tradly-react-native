import { useCallback, useEffect } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { ScrollView, XStack, YStack } from 'tamagui'
import { useShallow } from 'zustand/react/shallow'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation/Stack'

import { TabParamsList } from '@navigation/Tab'
import { Button, Heading, MenuCard, ProductCard, SliderItem, StoreCard } from '@components'
import { DASHBOARD } from '@constants'
import { ICategoryItem, ISliderItem } from '@constants/screens/dashboard'
import { renderItem } from '@utils'
import { useGetProducts, useGetStores } from '@hooks'
import { IProduct, IStore } from '@types'
import { useCacheStore } from '@stores'

import styles from './styles'

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const Dashboard = ({ navigation }: HomeScreenProps) => {
  const [cacheProducts, setProducts, cacheStores, setStores] = useCacheStore(
    useShallow((state) => [state.products, state.setProducts, state.stores, state.setStores])
  )
  // const { data: products } = useGetProducts(process.env.PRODUCT_ENDPOINT)
  const { data: paginationProducts } = useGetProducts('/api/products')
  // const { data: stores } = useGetStores(process.env.STORE_ENDPOINT)
  const { data: stores } = useGetStores('/api/stores')
  useEffect(() => {
    if (!paginationProducts) return
    if (!stores) return
    setProducts(paginationProducts.products)
    setStores(stores)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationProducts, stores])
  const handleSeeAllProducts = useCallback(() => undefined, []) // TODO: Replacing with navigate to another screen
  const handleMoveToCategoryScreen = useCallback(({ id, name }: ICategoryItem) => {
    // navigation.navigate('CategoryDetail', { id, name })
    navigation.navigate('HomeStack', { screen: 'CategoryDetail', params: { id, name } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleMoveToProduct = useCallback((id: string) => {
    // navigation.navigate('ProductDetail', { id })
    navigation.navigate('HomeStack', { screen: 'ProductDetail', params: { id } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderProductItem: ListRenderItem<IProduct> = useCallback(
    ({ item: { _id, img, price, discountPrice, name, store } }) => (
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
    ),
    [handleMoveToProduct]
  )
  const renderProducts = <T extends IProduct[]>(title: string, data: T) => {
    if (!data.length)
      return (
        <YStack padding="$space.4">
          <Heading
            content="Product empty!!!"
            color="$color.gray_50"
            fontWeight="$3"
            fontSize="$1"
            textAlign="center"
          />
        </YStack>
      )

    return (
      <>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          space="$space.1.5"
          marginVertical="$space.3.5"
          paddingHorizontal="$space.4.5"
        >
          <Heading content={title} color="$color.gray_50" fontSize="$3" />
          <Button
            shrink
            title="see all"
            paddingHorizontal="$space.5"
            paddingVertical="$space.1.5"
            fontSize={12}
            onPress={handleSeeAllProducts}
          />
        </XStack>
        <FlatList
          keyExtractor={({ _id }: IProduct): string => String(_id)}
          data={data}
          renderItem={renderProductItem}
          horizontal
          contentContainerStyle={styles.itemSpacing}
          showsHorizontalScrollIndicator={false}
        />
      </>
    )
  }
  const renderStoreItem: ListRenderItem<IStore> = ({ item: { avatar, name } }) => (
    <StoreCard
      bgImage={require('@assets/store/tradly.png')}
      source={{ uri: avatar }}
      name={`${name} store`}
      btnTitle="follow"
    />
  )

  return (
    <ScrollView flex={1} backgroundColor="$color.white">
      <FlatList
        keyExtractor={({ id }: ISliderItem): string => id}
        data={DASHBOARD.SLIDER_DATA}
        renderItem={renderItem(SliderItem)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderItem}
      />
      <FlatList
        keyExtractor={({ id }: ICategoryItem): string => id}
        data={DASHBOARD.CATEGORY_DATA}
        renderItem={renderItem(MenuCard, handleMoveToCategoryScreen)}
        numColumns={4}
        columnWrapperStyle={styles.menuItem}
        scrollEnabled={false}
      />
      <YStack marginVertical="$space.3">
        <>
          {renderProducts('New Product', paginationProducts?.products || cacheProducts)}
          {renderProducts('Popular Product', paginationProducts?.products || cacheProducts)}
        </>
      </YStack>
      <YStack>
        <View style={styles.bgStore} />
        <XStack
          alignItems="center"
          justifyContent="space-between"
          space="$space.1.5"
          marginVertical="$space.3.5"
          paddingHorizontal="$space.4.5"
        >
          <Heading content="Store to follow" color="$color.white" fontSize="$3" />
          <Button
            shrink
            paddingHorizontal="$space.5"
            paddingVertical="$space.1.5"
            fontSize={12}
            title="view all"
            variant="secondary"
            onPress={handleSeeAllProducts}
          />
        </XStack>
        <FlatList
          keyExtractor={({ _id }: IStore): string => _id}
          data={stores || cacheStores}
          renderItem={renderStoreItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.itemSpacing}
        />
      </YStack>
    </ScrollView>
  )
}

export default Dashboard
