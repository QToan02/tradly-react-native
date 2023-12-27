import { View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { BrowseBar, HomeBar, NormalBar, TabIcon } from '@components'
import { COLORS } from '@constants'

import { Browse, Dashboard, HomeStore, OrderHistory, Profile } from '@screens'
import styles from './styles'

export type TabParamsList = {
  HomeTab: undefined
  BrowseTab: undefined
  ProductTab: undefined
  OrderHistoryTab: undefined
  ProfileTab: undefined
}

const Tab = createBottomTabNavigator<TabParamsList>()
const CustomHeader = (Element: React.JSX.ElementType, props: BottomTabHeaderProps) => (
  <Element {...props} />
)

const Fragment = () => <View />

const renderTabIcon = (
  route: keyof TabParamsList,
  navigation: NavigationProp<TabParamsList>,
  color: string
): React.JSX.Element => {
  switch (route) {
    case 'HomeTab':
      return <TabIcon.Home color={color} />
    case 'BrowseTab':
      return <TabIcon.Search color={color} />
    case 'ProductTab':
      return <TabIcon.Store color={color} />
    case 'OrderHistoryTab':
      return <TabIcon.Order color={color} />
    case 'ProfileTab':
      return <TabIcon.Profile color={color} />
    default:
      return Fragment()
  }
}

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        tabBarIcon: ({ color }) => renderTabIcon(route.name, navigation, color),
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY_50,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tab,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Dashboard}
        options={{
          headerTitle: 'groceries',
          header: (props: BottomTabHeaderProps) => CustomHeader(HomeBar, props),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="BrowseTab"
        component={Browse}
        options={{
          headerTitle: 'browse',
          header: (props: BottomTabHeaderProps) => CustomHeader(BrowseBar, props),
          tabBarLabel: 'Browse',
        }}
      />
      <Tab.Screen
        name="ProductTab"
        component={HomeStore}
        options={{
          headerTitle: 'my store',
          header: (props: BottomTabHeaderProps) => CustomHeader(NormalBar, props),
          tabBarLabel: 'Product',
        }}
      />
      <Tab.Screen
        name="OrderHistoryTab"
        component={OrderHistory}
        options={{
          tabBarLabel: 'Order History',
          headerTitle: 'Order History',
          header: (props: BottomTabHeaderProps) => CustomHeader(NormalBar, props),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerTitle: 'Profile',
          header: (props: BottomTabHeaderProps) => CustomHeader(NormalBar, props),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNav
