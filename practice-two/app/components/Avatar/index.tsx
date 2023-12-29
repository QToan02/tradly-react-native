import { memo, useMemo, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { getTokens, Circle, Tokens } from 'tamagui'
import { ImageStyle, StyleProp } from 'react-native'

import Paragraph from '@components/Paragraph'

import StyledStack, { StyledImage, StyledImageProps, StyledStackProps } from './styles'

export type AvatarProps = StyledStackProps & {
  source: StyledImageProps['source']
  name: string
  size?: keyof Tokens['avatar']
}

const Avatar = ({ source, name, size = 'sm', ...rest }: AvatarProps) => {
  const imageSize = useRef<number>(getTokens().avatar[size].val)
  const imageStyle = useMemo<StyleProp<ImageStyle>>(
    () => ({
      width: imageSize.current,
      height: imageSize.current,
      borderRadius: 50,
    }),
    []
  )

  return (
    <StyledStack space="$space.2" {...rest}>
      <Circle>
        <StyledImage source={source} style={imageStyle} accessibilityLabel={`${name}-avatar`} />
      </Circle>
      <Paragraph
        content={name}
        numberOfLines={1}
        textAlign="center"
        color="$color.gray_50_alpha_50"
        textTransform="capitalize"
        fontSize="$1"
        lineHeight="$3"
        fontWeight="$2"
      />
    </StyledStack>
  )
}

export default memo(Avatar, isEqual)
