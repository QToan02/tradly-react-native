import { useCallback } from 'react'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

import Bar from '@components/Bar'

const ProfileBar = ({ options, route, navigation }: NativeStackHeaderProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleGoBack = useCallback(() => navigation.goBack(), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePressSearch = useCallback(() => navigation.goBack(), [])

  return (
    <Bar
      title={options.headerTitle?.toString() || route.name}
      align="center"
      paddingTop="$space.3"
      showBackBtn
      showSearchBtn
      onPressBack={handleGoBack}
      onPressSearch={handlePressSearch}
    />
  )
}

export default ProfileBar
