import { Dimensions, Image } from 'react-native'
import { Separator, XStack, YStack } from 'tamagui'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { RootStackParamList } from '@navigation/Stack'
import { TabParamsList } from '@navigation/Tab'
import { Heading, Paragraph } from '@components'

import styles from './styles'

export type OrderHistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamsList, 'ProfileTab'>,
  NativeStackScreenProps<RootStackParamList>
>

const Profile = () => {
  return (
    <YStack backgroundColor="$color.bg_layer" flex={1}>
      <YStack
        paddingHorizontal="$space.5"
        paddingTop="$space.3.5"
        paddingBottom={Dimensions.get('window').height / 4}
        backgroundColor="$color.primary"
      >
        <XStack space="$space.3.5">
          <Image source={require('@assets/avatar.png')} style={styles.storeAvatar} />
          <YStack space="$space.0.5">
            <Heading content="Tradly Team" fontSize="$1" letterSpacing="$true" />
            <Paragraph content="+1 9998887776" />
            <Paragraph content="info@tradly.co" />
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
