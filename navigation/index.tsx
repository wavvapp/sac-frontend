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
import { useFriends } from "@/queries/friends"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import { RootStackParamList } from "@/types"
import StaticContentScreen from "@/screens/StaticContentScreen"
import NotificationPreferences from "@/screens/NotificationPreferences"
import GroupsScreen from "@/screens/Groups"
import CreateGroup from "@/screens/Groups/CreateGroup"
import EditGroup from "@/screens/Groups/EditGroups"
import { navigationRef } from "@/utils/navigation"
import { linking } from "./linking"

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { isAuthenticated, isLoading, isNewUser } = useAuth()
  const { isFetching: isFriendsLoading } = useFriends()

  useEffect(() => {
    if (!isLoading && !isFriendsLoading) {
      SplashScreen.hideAsync()
    }
  }, [isFriendsLoading, isLoading])

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
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
            <Stack.Screen
              name="NotificationPreferences"
              options={{ headerShown: false }}
              component={NotificationPreferences}
            />
            <Stack.Screen
              name="Groups"
              options={{ headerShown: false }}
              component={GroupsScreen}
            />
            <Stack.Screen
              name="CreateGroup"
              options={{ headerShown: false }}
              component={CreateGroup}
            />
            <Stack.Screen
              name="EditGroup"
              options={{ headerShown: false }}
              component={EditGroup}
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
            initialParams={{ pageSlug: "privacy" }}
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
