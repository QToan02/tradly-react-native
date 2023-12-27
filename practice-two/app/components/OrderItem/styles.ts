import { GetProps, styled } from 'tamagui'
import { Image } from 'react-native'

import Paragraph from '@components/Paragraph'

export const StyledText = styled(Paragraph, {
  content: '',
  fontWeight: '$2',
  color: '$color.gray_50',
  textTransform: 'capitalize',
})

export type StyledTextProps = GetProps<typeof StyledText>

export const StyledImage = styled(Image, {
  source: { uri: '' },
  style: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
})

export type StyledImageProps = GetProps<typeof StyledImage>
