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
import { ISliderItem } from '@constants/screens/dashboard'
import { getImageCategory, renderItem } from '@utils'
import { useGetCategories, useGetProducts, useGetStores } from '@hooks'
import { ICategory, IProduct, IStore } from '@types'
import { useAuthStore, useCacheStore, useCommonStore } from '@stores'

import styles from './styles'

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const Dashboard = ({ navigation }: HomeScreenProps) => {
  const authUser = useAuthStore((state) => state.user)
  const [setStoreId, setCategory] = useCommonStore(
    useShallow((state) => [state.setStoreId, state.setCategory])
  )
  const [cacheProducts, setProducts, cacheStores, setStores] = useCacheStore(
    useShallow((state) => [state.products, state.setProducts, state.stores, state.setStores])
  )
  const { data: paginationProducts } = useGetProducts('/api/products')
  const { data: stores } = useGetStores('/api/stores')
  const { data: categories, isSuccess: getCategorySuccess } = useGetCategories('api/categories')
  useEffect(() => {
    if (!paginationProducts) return
    if (!stores) return

    setStoreId(stores.find(({ user }: IStore) => String(authUser?._id) === user)?._id || '')
    setProducts(paginationProducts.products)
    setStores(stores)

    if (!getCategorySuccess) return
    setCategory(categories)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, getCategorySuccess, paginationProducts, stores])
  const handleSeeAllProducts = useCallback(() => {
    navigation.navigate('BrowseTab')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleMoveToCategoryScreen = useCallback((id: string) => {
    navigation.navigate('HomeStack', { screen: 'CategoryDetail', params: { id } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleMoveToProduct = useCallback((id: string) => {
    navigation.navigate('HomeStack', { screen: 'ProductDetail', params: { id } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleMoveToStoreDetail = useCallback((id: string) => {
    navigation.navigate('StoreStack', { screen: 'StoreProfile', params: { id } })
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
  const renderStoreItem: ListRenderItem<IStore> = ({ item: { _id, avatar, name } }) => (
    <StoreCard
      _id={_id}
      bgImage={require('@assets/store/tradly.png')}
      source={{ uri: avatar }}
      name={`${name} store`}
      btnTitle="follow"
      onPressBtn={handleMoveToStoreDetail}
    />
  )
  const renderCategoryItem: ListRenderItem<ICategory> = ({ item: { _id, name } }) => (
    <MenuCard
      _id={_id}
      name={name}
      source={getImageCategory(name)}
      onPress={handleMoveToCategoryScreen}
    />
  )

  return (
    <ScrollView
      flex={1}
      backgroundColor="$color.white"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <FlatList
        keyExtractor={({ id }: ISliderItem): string => id}
        data={DASHBOARD.SLIDER_DATA}
        renderItem={renderItem(SliderItem)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderItem}
      />
      <FlatList
        keyExtractor={({ _id }: ICategory): string => _id}
        data={categories}
        renderItem={renderCategoryItem}
        numColumns={4}
        contentContainerStyle={styles.categories}
        columnWrapperStyle={styles.menuItem}
        scrollEnabled={false}
      />
      <YStack marginVertical="$space.3">
        <>
          {renderProducts('New Product', paginationProducts?.products || cacheProducts)}
          {renderProducts(
            'Popular Product',
            (Array.from(
              JSON.parse(JSON.stringify(paginationProducts?.products || []))
            ).reverse() as IProduct<object>[]) ||
              (Array.from(
                JSON.parse(JSON.stringify(cacheProducts || []))
              ).reverse() as IProduct<object>[])
          )}
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
