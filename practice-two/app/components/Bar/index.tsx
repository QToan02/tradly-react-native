import React, { ReactNode, memo } from 'react'
import isEqual from 'react-fast-compare'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { XStack, XStackProps, YStack, YStackProps } from 'tamagui'

import Heading from '@components/Heading'
import IconButton from '@components/IconButton'

import styles from './styles'

export type BarProps = {
  title?: string
  showBackBtn?: boolean
  showSearchBtn?: boolean
  align?: XStackProps['justifyContent']
  IconList?: ReactNode
  children?: ReactNode
  onPressBack?: () => void
  onPressSearch?: () => void
} & YStackProps

const Bar = ({
  title,
  showBackBtn = false,
  showSearchBtn = false,
  align = 'flex-start',
  IconList,
  children,
  onPressBack,
  onPressSearch,
  ...rest
}: BarProps) => {
  const checkProps = title || showBackBtn || IconList
  const insets = useSafeAreaInsets()

  return (
    <YStack
      paddingHorizontal={16}
      paddingTop={insets.top}
      paddingBottom={22}
      backgroundColor="$color.primary"
      space="$space.5"
      {...rest}
    >
      {checkProps && (
        <XStack space={4} alignItems="center" justifyContent={align}>
          {showBackBtn && (
            <IconButton
              style={[styles.absoluteBtn, styles.toLeft]}
              icon={require('@assets/back.png')}
              onPress={onPressBack}
              noBackground
            />
          )}
          {title && <Heading content={title} textTransform="capitalize" />}
          {IconList && (
            <XStack space={4} alignItems="center">
              {IconList}
            </XStack>
          )}
          {showSearchBtn && (
            <IconButton
              style={[styles.absoluteBtn, styles.toRight]}
              icon={require('@assets/search.png')}
              onPress={onPressSearch}
              noBackground
            />
          )}
        </XStack>
      )}
      {children && (
        <XStack space={4} alignItems="center" justifyContent="space-between">
          {children}
        </XStack>
      )}
    </YStack>
  )
}

export default memo(Bar, isEqual)
