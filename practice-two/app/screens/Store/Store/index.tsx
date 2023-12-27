import { useCallback, useMemo } from 'react'
import { Image } from 'react-native'
import { ScrollView, XStack, YStack } from 'tamagui'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { Button, Heading } from '@components'

import styles from './styles'

export type StoreHomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'ProductTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const StoreHome = ({ navigation }: StoreHomeScreenProps) => {
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
  const HeaderView = useMemo(
    () => (
      <YStack marginVertical="$space.7" alignItems="center" space="$space.5">
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
  const StoreInfo = (
    <YStack backgroundColor="$color.white">
      <YStack alignItems="center" space="$space.4.5" marginVertical="$space.6">
        <Image source={require('@assets/avatar.png')} style={styles.storeAvatar} />
        <Heading content="Tradly Store" color="$color.gray_50" />
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
  )

  return (
    <ScrollView backgroundColor="$color.bg_layer">
      <YStack space="$space.5">{StoreInfo}</YStack>
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
    </ScrollView>
  )
}

export default StoreHome
