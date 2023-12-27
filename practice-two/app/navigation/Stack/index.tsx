import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigatorScreenParams } from '@react-navigation/native'

import {
  AddAddress,
  AddCard,
  AddProduct,
  Cart,
  CategoryDetail,
  CreateStore,
  Login,
  Onboarding,
  OrderDetail,
  Payment,
  ProductDetail,
  SignUp,
} from '@screens'
import { CategoryBar, BackBar } from '@components'
import { COLORS } from '@constants'
import BottomNav, { TabParamsList } from '@navigation/Tab'

type PublicStackParamsList = {
  Onboarding: undefined
  Login: undefined
  SignUp: undefined
}

type HomeStackParamsList = {
  Home: undefined
  CategoryDetail: { id: string; name: string } // ID of the corresponding category
  ProductDetail: { id: string } // ID of the product
  Cart: undefined
  AddAddress: undefined
  AddCard: undefined
  Payment: undefined
  OrderDetail: { id: string } // ID of the order
}

type BrowseStackParamsList = {
  Browse: { search: string } | undefined
  Cart: undefined
  AddAddress: undefined
  AddCard: undefined
  Payment: undefined
  OrderDetail: { id: string } // ID of the order
}

type StoreStackParamsList = {
  Store: undefined
  CreateStore: undefined
  AddProduct: { id: string } | undefined // Provide ID in the modify mode
  Cart: undefined
  AddAddress: undefined
  AddCard: undefined
  Payment: undefined
  OrderDetail: { id: string } // ID of the order
}

export type RootStackParamList = {
  Tabs: NavigatorScreenParams<TabParamsList>
  HomeStack: NavigatorScreenParams<HomeStackParamsList>
  BrowseStack: NavigatorScreenParams<BrowseStackParamsList>
  StoreStack: NavigatorScreenParams<StoreStackParamsList>
  // Home: undefined
  // Browse: { search: string } | undefined // Search keyword
  // Onboarding: undefined
  // Login: undefined
  // SignUp: undefined
  // CategoryDetail: { id: string; name: string } // ID of the corresponding category
  // ProductDetail: { id: string } // ID of the product
  // Wishlist: { id: string } // ID of the current login user
  // Cart: undefined
  // AddAddress: undefined
  // AddCard: undefined
  // Payment: undefined
  // OrderDetail: { id: string } // ID of the order
  // Store: undefined
  // CreateStore: undefined
} & PublicStackParamsList &
  HomeStackParamsList &
  BrowseStackParamsList &
  StoreStackParamsList &
  TabParamsList

const Stack = createNativeStackNavigator<RootStackParamList>()
const CustomHeader = (Element: React.JSX.ElementType, props: NativeStackHeaderProps) => (
  <Element {...props} />
)

const PublicStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Onboarding"
    screenOptions={{ headerShown: false, statusBarColor: COLORS.PRIMARY }}
  >
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerShown: true,
        headerTitle: '',
        headerStyle: { backgroundColor: COLORS.PRIMARY },
        headerShadowVisible: false,
        headerTintColor: COLORS.WHITE,
      }}
    />
  </Stack.Navigator>
)

const CheckOutStack = (
  <Stack.Group
    screenOptions={{
      header: (props: NativeStackHeaderProps) => CustomHeader(BackBar, props),
    }}
  >
    <Stack.Screen name="Cart" component={Cart} options={{ headerTitle: 'my cart' }} />
    <Stack.Screen
      name="AddAddress"
      component={AddAddress}
      options={{ headerTitle: 'add a new address' }}
    />
    <Stack.Screen name="AddCard" component={AddCard} options={{ headerTitle: 'add card' }} />
    <Stack.Screen name="Payment" component={Payment} options={{ headerTitle: 'payment option' }} />
    <Stack.Screen
      name="OrderDetail"
      component={OrderDetail}
      options={{ headerTitle: 'order details' }}
    />
  </Stack.Group>
)

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
    <Stack.Screen
      name="CategoryDetail"
      component={CategoryDetail}
      options={{
        header: (props: NativeStackHeaderProps) => CustomHeader(CategoryBar, props),
      }}
    />
    {CheckOutStack}
  </Stack.Navigator>
)

const BrowseStack = () => <Stack.Navigator>{CheckOutStack}</Stack.Navigator>

const StoreManagementStack = (
  <Stack.Group
    screenOptions={{
      header: (props: NativeStackHeaderProps) => CustomHeader(BackBar, props),
    }}
  >
    <Stack.Screen
      name="CreateStore"
      component={CreateStore}
      options={{ headerTitle: 'my store' }}
    />
    <Stack.Screen
      name="AddProduct"
      component={AddProduct}
      options={{ headerTitle: 'add product' }}
    />
    {CheckOutStack}
  </Stack.Group>
)

const StoreStack = () => <Stack.Navigator>{StoreManagementStack}</Stack.Navigator>

const PrivateStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, statusBarColor: COLORS.PRIMARY }}>
    <Stack.Screen name="Tabs" component={BottomNav} />
    <Stack.Screen name="HomeStack" component={HomeStack} />
    <Stack.Screen name="BrowseStack" component={BrowseStack} />
    <Stack.Screen name="StoreStack" component={StoreStack} />
  </Stack.Navigator>
)

export default { PrivateStackNavigator, PublicStackNavigator }
