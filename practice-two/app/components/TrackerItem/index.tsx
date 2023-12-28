import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import { View, ViewProps } from 'react-native'

import Paragraph from '@components/Paragraph'
import { TTrackerStatus } from '@types'
import { containerStyles } from '@styles'
import styles from './styles'

export interface TrackerItemProps extends ViewProps {
  trackStatus: TTrackerStatus
  description: string
  datetime: string
}

const TrackerItem = ({ trackStatus, description, datetime, style, ...rest }: TrackerItemProps) => {
  const convert = useMemo(() => {
    if (!datetime) return {}
    const convertDate = new Date(datetime)

    const hour = convertDate.getUTCHours()
    const minute = convertDate.getUTCMinutes()

    let formattedHour = hour % 12
    formattedHour = formattedHour === 0 ? 12 : formattedHour

    const period = hour < 12 ? 'AM' : 'PM'

    return {
      date: convertDate.toLocaleDateString('en-GB'),
      time: `${formattedHour}:${minute} ${period}`,
    }
  }, [datetime])

  return (
    <View style={[styles.container, style]} {...rest}>
      <View style={[containerStyles.inline, containerStyles.spaceBetween]}>
        <Paragraph content={trackStatus} style={[styles.text, styles.title]} />
        <Paragraph content={convert.date || ''} style={styles.text} />
      </View>
      <View style={[containerStyles.inline, containerStyles.spaceBetween]}>
        <Paragraph content={description} style={styles.text} />
        <Paragraph content={convert.time || ''} style={styles.text} />
      </View>
    </View>
  )
}

export default memo(TrackerItem, isEqual)
