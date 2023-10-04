import { View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { BottomTabHeaderProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Bar, BrowseBar, HomeBar, TabIcon } from '@components'
import { COLORS } from '@constants'
import Stack from '@navigation/Stack'

import styles from './styles'

export type TabParamsList = {
  Home: undefined
  Browse: { search: string } | undefined // Search keyword
  Product: undefined
  ['Order History']: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<TabParamsList>()

const Fragment = () => <View />

const renderTabIcon = (
  route: keyof TabParamsList,
  navigation: NavigationProp<TabParamsList>,
  color: string
): React.JSX.Element => {
  switch (route) {
    case 'Home':
      return <TabIcon.Home color={color} />
    case 'Browse':
      return <TabIcon.Search color={color} />
    case 'Product':
      return <TabIcon.Store color={color} />
    case 'Order History':
      return <TabIcon.Order color={color} />
    case 'Profile':
      return <TabIcon.Profile color={color} />
    default:
      return Fragment()
  }
}

const Header = (title: string) => <Bar title={title} />
const CustomHeader = (Element: React.JSX.ElementType, props: BottomTabHeaderProps) => (
  <Element {...props} />
)

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        header: () => Header(route.name),
        tabBarIcon: ({ color }) => renderTabIcon(route.name, navigation, color),
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GRAY_50,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tab,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Stack.HomeStack}
        options={{
          headerTitle: 'Groceries',
          header: (props: BottomTabHeaderProps) => CustomHeader(HomeBar, props),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Stack.BrowseStack}
        options={{
          header: (props: BottomTabHeaderProps) => CustomHeader(BrowseBar, props),
        }}
      />
      <Tab.Screen name="Product" component={Fragment} />
      <Tab.Screen name="Order History" component={Fragment} />
      <Tab.Screen name="Profile" component={Fragment} />
    </Tab.Navigator>
  )
}

export default BottomNav
