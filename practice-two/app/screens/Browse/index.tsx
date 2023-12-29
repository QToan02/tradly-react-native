import { useCallback, useMemo } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Spinner, YStack } from 'tamagui'
import { CompositeScreenProps } from '@react-navigation/native'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { ProductCard, Paragraph, Heading } from '@components'
import { useGetProducts } from '@hooks'
import { IProduct } from '@types'

import styles from './styles'

export type BrowseScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'BrowseTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const Browse = ({ navigation }: BrowseScreenProps) => {
  const { data: paginateProducts, isSuccess, isLoading } = useGetProducts('api/products')

  const handleMoveToProduct = useCallback((id: string) => {
    navigation.navigate('BrowseStack', { screen: 'ProductDetail', params: { id } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderProductItem: ListRenderItem<IProduct<object>> = useCallback(
    ({ item }) => {
      if (!isSuccess) return null
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
          onPressCard={handleMoveToProduct}
        />
      )
    },
    [isSuccess, handleMoveToProduct]
  )
  const Item = useMemo(() => {
    if (isLoading) return <Spinner size="large" color="$color.primary" />
    if (!isSuccess) return null
    if (!paginateProducts.products.length)
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
            content="Don't have any products"
            color="$color.gray_50"
            fontSize="$2"
            fontWeight="$2"
            textAlign="center"
          />
        </YStack>
      )

    return (
      <FlatList
        keyExtractor={({ _id }: IProduct<object>): string => _id}
        data={paginateProducts.products}
        renderItem={renderProductItem}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.item}
        columnWrapperStyle={styles.column}
      />
    )
  }, [isLoading, isSuccess, paginateProducts, renderProductItem])

  return (
    <YStack flex={1} backgroundColor="$color.bg_layer">
      {Item}
    </YStack>
  )
}

export default Browse
