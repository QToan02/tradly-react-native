import { useCallback, useMemo } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { Spinner, YStack } from 'tamagui'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@navigation/Stack'

import { ProductCard, Paragraph, Heading } from '@components'
import { useGetProductsByCategory } from '@hooks'
import { ICategory, IProduct } from '@types'
import { useCommonStore } from '@stores'

import styles from './styles'

export type CategoryDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CategoryDetail'>

const CategoryDetail = ({ route, navigation }: CategoryDetailScreenProps) => {
  const { id: categoryId } = route.params
  const category = useCommonStore((state) => state.category)
  const {
    data: paginateProducts,
    isSuccess,
    isLoading,
  } = useGetProductsByCategory('api/products', categoryId)
  // TODO: Change data
  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: category.find(({ _id }: ICategory) => _id === categoryId)?.name,
    })
  })

  const handleMoveToProduct = useCallback((id: string) => {
    navigation.navigate('ProductDetail', { id })
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
            content="Don't have any products in this category"
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

export default CategoryDetail
