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
import { theme } from "@/theme"
import { useMemo } from "react"
import NoFriendsScreen from "@/screens/NoFriends"

export type RootStackParamList = {
  Home: undefined
  EditSignal: undefined
  Login: undefined
  SignUp: undefined
  Settings: undefined
  Signaling: undefined
  NoFriends: undefined
}

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { isAuthenticated, isLoading } = useAuth()
  const hasFriends = useMemo(() => {
    // const friends = [...availableFriends, ...offlineFriends]
    const friends = []
    if (friends.length !== 0) return true
    return false
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
