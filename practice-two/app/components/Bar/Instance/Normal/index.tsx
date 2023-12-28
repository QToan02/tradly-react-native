import { useCallback, useMemo } from 'react'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

import Bar from '@components/Bar'
import { IIconList } from '@types'
import IconButton from '@components/IconButton'
import { BAR } from '@constants'

const NormalBar = ({ options, route, navigation }: NativeStackHeaderProps) => {
  const handleNavigateToCart = useCallback(
    () => navigation.navigate('StoreStack', { screen: 'Cart' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const handleNavigateToWishlist = useCallback(
    () => navigation.navigate('StoreStack', { screen: 'Wishlist' }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const IconList = useMemo(
    () =>
      BAR.HOME.map(({ label, ...rest }: IIconList) => (
        <IconButton
          key={label}
          onPress={label === 'cart' ? handleNavigateToCart : handleNavigateToWishlist}
          {...rest}
        />
      )),
    [handleNavigateToCart, handleNavigateToWishlist]
  )

  return (
    <Bar
      title={options.headerTitle?.toString() || route.name}
      IconList={IconList}
      align="space-between"
    />
  )
}

export default NormalBar
