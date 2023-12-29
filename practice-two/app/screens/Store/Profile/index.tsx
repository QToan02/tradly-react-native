import { useCallback } from 'react'
import { Dimensions, Image } from 'react-native'
import { Spinner, XStack, YStack } from 'tamagui'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useFocusEffect } from '@react-navigation/native'

import { RootStackParamList } from '@navigation/Stack'
import { Button, Heading, Paragraph } from '@components'
import { useFindStore } from '@hooks'

import styles from './styles'

export type StoreProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'StoreProfile'>

const StoreProfile = ({ navigation, route }: StoreProfileScreenProps) => {
  const { data: userStore, isSuccess: isGetStoreSuccess } = useFindStore(
    'api/store',
    route.params.id
  )

  useFocusEffect(
    useCallback(() => {
      if (!isGetStoreSuccess) return

      navigation.setOptions({ headerTitle: `${userStore.name} store` })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isGetStoreSuccess, userStore])
  )

  return isGetStoreSuccess ? (
    <YStack flex={1} backgroundColor="$color.bg_layer" space>
      <XStack backgroundColor="$color.primary" height="$space.20" marginBottom="$space.1.5">
        <YStack
          position="absolute"
          width={Dimensions.get('window').width}
          paddingTop="$space.5"
          paddingLeft="$space.8"
          paddingRight="$space.7"
          paddingBottom="$space.7"
          backgroundColor="$color.white"
          borderRadius="$radius.true"
        >
          <XStack justifyContent="space-between">
            <XStack space="$space.2.5">
              <Image source={{ uri: userStore.avatar }} style={styles.storeAvatar} />
              <YStack space="$space.0.25">
                <Heading
                  content={`${userStore.name} store`}
                  textTransform="capitalize"
                  color="$color.gray_50"
                  fontSize="$1"
                  fontWeight="$2"
                />
                <Paragraph
                  content={`${userStore.name}.co`}
                  color="$color.gray_50_alpha_50"
                  fontSize={12}
                />
              </YStack>
            </XStack>
            <Button
              title="follow"
              shrink
              alignSelf="center"
              paddingHorizontal="$space.5"
              paddingVertical="$space.1.5"
              fontSize={12}
            />
          </XStack>
          <Paragraph
            content={userStore.description}
            marginTop="$space.5"
            paddingLeft="$space.1.5"
            fontSize={12}
            fontWeight="$2"
            letterSpacing={0.3}
            color="$color.gray_50"
            opacity={0.7}
          />
        </YStack>
      </XStack>
      <XStack
        space="$space.10"
        paddingTop="$space.5"
        paddingHorizontal="$space.9"
        backgroundColor="$color.white"
        borderRadius="$radius.true"
      >
        <YStack alignItems="center" space="$space.2">
          <Paragraph content="Total Followers" color="$color.gray_50" fontWeight="$2" />
          <Paragraph content={String(0)} color="$color.gray_50" fontWeight="$2" />
        </YStack>
        <YStack alignItems="center" space="$space.2">
          <Paragraph content="Total Products" color="$color.gray_50" fontWeight="$2" />
          <Paragraph content={String(0)} color="$color.gray_50" fontWeight="$2" />
        </YStack>
      </XStack>
    </YStack>
  ) : (
    <Spinner size="large" color="$color.primary" />
  )
}

export default StoreProfile
