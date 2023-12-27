import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Image, ImageBackgroundProps } from 'react-native'
import { Stack, StackProps, Tokens, YStack } from 'tamagui'

import Avatar, { AvatarProps } from '@components/Avatar'
import Button from '@components/Button'
import { containerStyles } from '@styles'

import styles from './styles'

export type StoreCardProps = StackProps &
  Pick<AvatarProps, 'source' | 'name'> & {
    bgImage: ImageBackgroundProps['source']
    btnTitle: string
    size?: keyof Tokens['avatar']
    onPressBtn?: () => void
  }

const StoreCard = ({
  bgImage,
  source,
  name,
  size = 'xl',
  btnTitle,
  onPressBtn,
  ...rest
}: StoreCardProps) => {
  return (
    <Stack
      alignSelf="baseline"
      paddingTop="$space.9"
      paddingBottom="$space.4"
      paddingHorizontal="$space.5"
      w={160}
      style={containerStyles.card}
      {...rest}
    >
      <Image source={bgImage} style={styles.img} />
      <YStack justifyContent="center" alignItems="center">
        <Avatar source={source} name={name} size={size} block />
        <Button
          marginTop="$space.4"
          paddingHorizontal="$space.5"
          paddingVertical={4}
          fontSize={10}
          title={btnTitle}
          onPress={onPressBtn}
        />
      </YStack>
    </Stack>
  )
}

export default memo(StoreCard, isEqual)
