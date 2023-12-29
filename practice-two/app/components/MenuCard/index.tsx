import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { Stack } from 'tamagui'

import Paragraph from '@components/Paragraph'
import { imageStyles } from '@styles'

import StyledImageBackground, { StyledImageBackgroundProps } from './styles'

export type MenuCardProps = {
  source: StyledImageBackgroundProps['source']
  name: string
  onPress?: (categoryId: string) => void
  _id?: string
}

const MenuCard = ({ _id, source, name, onPress }: MenuCardProps) => {
  const handlePress = useCallback(() => {
    if (!_id) return undefined
    if (!onPress) return undefined

    return onPress(_id)
  }, [_id, onPress])

  return (
    <Stack
      flex={1}
      justifyContent="center"
      alignItems="stretch"
      pressStyle={{ opacity: 0.8 }}
      onPress={handlePress}
    >
      <StyledImageBackground
        source={source}
        justifyContent="center"
        alignItems="center"
        style={imageStyles.menu}
      >
        <Paragraph content={name} fontWeight="$3" fontSize={11} textTransform="capitalize" />
      </StyledImageBackground>
    </Stack>
  )
}

export default memo(MenuCard, isEqual)
