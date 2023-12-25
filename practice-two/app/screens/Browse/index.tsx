import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { DASHBOARD } from '@constants'
import { renderItem } from '@utils'
import { WrapList, ProductCard } from '@components'
import { IProductItem } from '@constants/screens/dashboard'

import styles from './styles'

export type BrowseScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'BrowseTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const Browse = () => {
  return (
    <WrapList
      keyExtractor={({ id }: IProductItem): string => id}
      style={styles.container}
      data={DASHBOARD.PRODUCT_DATA}
      renderItem={renderItem(ProductCard)}
      numColumns={2}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default Browse
