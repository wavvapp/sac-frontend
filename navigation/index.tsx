import { NavigationContainer } from "@react-navigation/native"
import "react-native-reanimated"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "@/screens/Home"
import EditSignal from "@/screens/EditSignal"
import { useAuth } from "@/contexts/AuthContext"
import SignUp from "@/screens/Authentication/SignUp"
import Login from "@/screens/Authentication/Login"
import CustomSplashScreen from "@/screens/CustomSplashScreen"
import Settings from "@/screens/Settings"
import Signaling from "@/components/lists/Signaling"
import Search from "@/screens/Search"
import { theme } from "@/theme"
import { useMemo } from "react"
import NoFriendsScreen from "@/screens/NoFriends"

export type RootStackParamList = {
  Home: any
  EditSignal: undefined
  Login: undefined
  SignUp: undefined
  Settings: undefined
  Signaling: undefined
  Search: undefined
  NoFriends: undefined
}

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { isAuthenticated, isLoading } = useAuth()
  const hasFriends = useMemo(() => {
    //TODO: Uncomment this line once the screen's implementation is approved. This line was commented so we could taste the nofriend screen
    // const friends = [...availableFriends, ...offlineFriends]
    const friends = []
    return friends.length !== 0
  }, [])

  if (isLoading) {
    return <CustomSplashScreen />
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitleStyle: { color: theme.colors.white },
          }}
          initialRouteName="Home">
          {hasFriends ? (
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
          ) : (
            <Stack.Screen
              name="NoFriends"
              options={{ headerShown: false }}
              component={NoFriendsScreen}
            />
          )}
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="EditSignal"
            options={{ headerShown: false, presentation: "modal" }}
            component={EditSignal}
          />
          <Stack.Screen
            name="Signaling"
            options={{ presentation: "modal", headerShown: false }}
            component={Signaling}
          />
          <Stack.Screen
            name="Search"
            options={{ headerShown: false }}
            component={Search}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
