import { useCallback, useMemo } from 'react'
import { Image } from 'react-native'
import { ScrollView, YStack } from 'tamagui'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/Stack'
import { Button, Heading } from '@components'

import styles from './styles'

export type StoreHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Store'>

const StoreHome = ({ navigation }: StoreHomeScreenProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMoveToCreateStore = useCallback(() => navigation.navigate('CreateStore'), [])
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
      </YStack>
    ),
    []
  )
  return (
    <ScrollView>
      <YStack space="$space.5">
        {HeaderView}
        <Button
          title="Create store"
          marginHorizontal="$space.11"
          fontSize="$3"
          fontWeight="$3"
          lineHeight="$3"
          onPress={handleMoveToCreateStore}
        />
      </YStack>
    </ScrollView>
  )
}

export default StoreHome
