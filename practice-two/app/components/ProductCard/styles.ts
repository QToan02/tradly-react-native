import { StyleSheet } from 'react-native'

import { COLORS } from '@constants'

const styles = StyleSheet.create({
  img: {
    width: 160,
    height: 128,
  },
  border: {
    paddingVertical: 57,
    paddingHorizontal: 17,
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.GRAY_300,
    opacity: 0.6,
    borderStyle: 'dashed',
  },
})

export default styles
