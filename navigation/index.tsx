import { NavigationContainer } from "@react-navigation/native"
import "react-native-reanimated"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "@/screens/Home"
import EditSignal from "@/screens/EditSignal"
import { useAuth } from "@/contexts/AuthContext"
import SignUp from "@/screens/Authentication/SignUp"
import Settings from "@/screens/Settings"
import Search from "@/screens/Search"
import { theme } from "@/theme"
import EntryScreen from "@/screens/Authentication"
import CreateCredentials from "@/screens/Authentication/SignUp/CreateCredentials"
import { StatusProvider } from "@/contexts/StatusContext"
import { useFriends } from "@/hooks/useFriends"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import StaticPage from "@/screens/StaticPage"
import { StaticPageType } from "@/types"
export type RootStackParamList = {
  EntryScreen: undefined
  Home: undefined
  EditSignal: undefined
  SignUp: undefined
  Settings: undefined
  Signaling: undefined
  CreateCredentials: undefined
  Search: undefined
  StaticPage: { page: StaticPageType }
}

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { isAuthenticated, isLoading, isNewUser } = useAuth()
  const { isLoading: isFriendsLoading } = useFriends()

  useEffect(() => {
    if (!isLoading && !isFriendsLoading) {
      SplashScreen.hideAsync()
    }
  }, [isFriendsLoading, isLoading])

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <StatusProvider>
          <Stack.Navigator
            screenOptions={{
              headerTransparent: true,
              headerTitleStyle: { color: theme.colors.white },
            }}
            initialRouteName="Home">
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Settings"
              options={{ headerShown: false }}
              component={Settings}
            />
            <Stack.Screen
              name="EditSignal"
              options={{ headerShown: false, presentation: "modal" }}
              component={EditSignal}
            />
            <Stack.Screen
              name="Search"
              options={{ headerShown: false }}
              component={Search}
            />
          </Stack.Navigator>
        </StatusProvider>
      ) : (
        <Stack.Navigator
          initialRouteName={isNewUser ? "CreateCredentials" : "EntryScreen"}>
          <Stack.Screen
            name="StaticPage"
            options={{ presentation: "modal", headerShown: false }}
            component={StaticPage}
            initialParams={{ page: "privacy" }}
          />
          <Stack.Screen
            name="CreateCredentials"
            options={{ headerShown: false }}
            component={CreateCredentials}
          />
          <Stack.Screen
            name="EntryScreen"
            component={EntryScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
