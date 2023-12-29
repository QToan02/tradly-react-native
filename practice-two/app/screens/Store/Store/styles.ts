import { StyleSheet } from 'react-native'
import { COLORS } from '@constants'

const styles = StyleSheet.create({
  headerImg: {
    width: 152,
    height: 122,
  },
  storeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  container: {
    backgroundColor: COLORS.WHITE,
  },
  item: {
    paddingVertical: 30,
    rowGap: 10,
    alignSelf: 'center',
  },
  column: {
    columnGap: 10,
    justifyContent: 'flex-start',
  },
})

export default styles
