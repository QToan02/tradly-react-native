import { StyleSheet } from 'react-native'

import { COLORS } from '@constants'

const styles = StyleSheet.create({
  bar: {
    backgroundColor: COLORS.PRIMARY,
    rowGap: 24,
  },
  title: {
    textTransform: 'capitalize',
  },
  absoluteBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  toLeft: {
    left: 0,
  },
  toRight: {
    right: 0,
  },
  itemsContainer: {
    justifyContent: 'space-between',
  },
})

export default styles
