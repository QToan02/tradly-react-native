import { memo } from 'react'
import isEqual from 'react-fast-compare'
import { Image } from 'react-native'
import { Stack, StackProps } from 'tamagui'

import Paragraph from '@components/Paragraph'
import styles from './styles'

export type PlaceHolderProps = StackProps & {
  onTouchPlaceHolder?: () => void
}

const PlaceHolder = ({ onTouchPlaceHolder, ...rest }: PlaceHolderProps) => {
  return (
    <Stack style={styles.border} space="$space.2.5" onPress={onTouchPlaceHolder} {...rest}>
      <Image source={require('@assets/product/add.png')} />
      <Paragraph
        color="$color.gray_50"
        fontSize="$3"
        fontWeight="$2"
        textTransform="capitalize"
        lineHeight={28}
        letterSpacing={0.5}
        content="add product"
      />
    </Stack>
  )
}

export default memo(PlaceHolder, isEqual)
