import { useCallback } from 'react'
import { Dimensions, Image, ToastAndroid } from 'react-native'
import { Separator, XStack, YStack } from 'tamagui'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { useShallow } from 'zustand/react/shallow'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { Heading, Paragraph } from '@components'
import { useAuthStore } from '@stores'

import styles from './styles'

export type OrderHistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const Profile = () => {
  const [user, logout] = useAuthStore(useShallow((state) => [state.user, state.logout]))
  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem('user', () => {
      ToastAndroid.show('Hope to see you again soon!', ToastAndroid.LONG)
      logout()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <YStack backgroundColor="$color.bg_layer" flex={1}>
      <YStack
        paddingHorizontal="$space.5"
        paddingTop="$space.3.5"
        paddingBottom={Dimensions.get('window').height / 4}
        backgroundColor="$color.primary"
      >
        <XStack space="$space.3.5">
          <Image source={{ uri: user?.avatar }} style={styles.storeAvatar} />
          <YStack space="$space.0.5">
            <Heading
              content={`${user?.firstName} ${user?.lastName}`}
              fontSize="$1"
              letterSpacing="$true"
            />
            <Paragraph content={`+84 ${user?.phone}`} />
            <Paragraph content={`${user?.email}`} />
          </YStack>
        </XStack>
      </YStack>
      <YStack
        position="absolute"
        top={Dimensions.get('window').height / 7}
        left="$space.4.5"
        right="$space.4.5"
        paddingHorizontal="$space.true"
        backgroundColor="$color.white"
        borderRadius="$radius.true"
        $platform-ios={styles.shadow}
        $platform-android={{ elevation: 24 }}
      >
        <Paragraph
          content="Edit Profile"
          paddingVertical="$space.4"
          textAlign="left"
          color="$color.gray_50"
          fontWeight="$2"
        />
        <Separator height="$space.0.5" borderColor="$color.divider" />
        <Paragraph
          content="Language & Currency"
          paddingVertical="$space.4"
          textAlign="left"
          color="$color.gray_50"
          fontWeight="$2"
        />
        <Separator height="$space.0.5" borderColor="$color.divider" />
        <Paragraph
          content="Feedback"
          paddingVertical="$space.4"
          textAlign="left"
          color="$color.gray_50"
          fontWeight="$2"
        />
        <Separator height="$space.0.5" borderColor="$color.divider" />
        <Paragraph
          content="Refer a Friend"
          paddingVertical="$space.4"
          textAlign="left"
          color="$color.gray_50"
          fontWeight="$2"
        />
        <Separator height="$space.0.5" borderColor="$color.divider" />
        <Paragraph
          content="Terms & Conditions"
          paddingVertical="$space.4"
          textAlign="left"
          color="$color.gray_50"
          fontWeight="$2"
        />
        <Separator height="$space.0.5" borderColor="$color.divider" />
        <Paragraph
          content="Logout"
          onPress={handleLogout}
          paddingVertical="$space.4"
          textAlign="left"
          color="$color.primary"
          fontWeight="$2"
          pressStyle={{ opacity: 0.5 }}
        />
      </YStack>
    </YStack>
  )
}

export default Profile
