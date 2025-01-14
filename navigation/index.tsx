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
import { usePrefetch } from "@/hooks/useSplashScreen"
import * as SplashScreen from "expo-splash-screen"
import { useEffect, useRef } from "react"
import { StaticPageType } from "@/types"
import StaticContentScreen from "@/screens/StaticContentScreen"
import AlertDialog from "@/components/AlertDialog"
import { View } from "react-native"

export type RootStackParamList = {
  EntryScreen: undefined
  Home: undefined
  EditSignal: undefined
  SignUp: undefined
  Settings: undefined
  Signaling: undefined
  CreateCredentials: undefined
  Search: undefined
  StaticContentScreen: { page: StaticPageType }
}

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { isAuthenticated, isNewUser, isOnline } = useAuth()
  const { isPrefetching, startPrefetch } = usePrefetch()

  const isInitialized = useRef(false)

  const handleLayout = () => {
    if (!isInitialized.current) {
      isInitialized.current = true
      // initializeApp()
    }
  }
  useEffect(() => {
    const initializeApp = async () => {
      await startPrefetch({
        onSuccess: async () => {
          await SplashScreen.hideAsync()
        },
        onError: async (error) => {
          console.error("Prefetch failed---------:", error)
          await SplashScreen.hideAsync()
        },
      })
    }

    initializeApp()
  }, [startPrefetch])

  useEffect(() => {
    if (!isOnline) {
      AlertDialog.open()
    }
  }, [isOnline])

  if (isPrefetching) {
    return null
  }
  return (
    <View onLayout={handleLayout} style={{ flex: 1 }}>
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
                options={{ headerShown: false }}
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
              name="StaticContentScreen"
              options={{ presentation: "modal", headerShown: false }}
              component={StaticContentScreen}
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
    </View>
  )
}
