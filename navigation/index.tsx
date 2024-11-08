import { NavigationContainer } from "@react-navigation/native"
import "react-native-reanimated"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "@/screens/Home"
import EditSignal from "@/screens/EditSignal"
import { useAuth } from "@/contexts/AuthContext"
import SignUp from "@/screens/Authentication/SignUp"
import CustomSplashScreen from "@/screens/CustomSplashScreen"
import Settings from "@/screens/Settings"
import Signaling from "@/components/lists/Signaling"
import Search from "@/screens/Search"
import { theme } from "@/theme"
import EntryScreen from "@/screens/Authentication"
import CreateCredentials from "@/screens/Authentication/SignUp/CreateCredentials"

export type RootStackParamList = {
  EntryScreen: undefined
  Home: undefined
  EditSignal: undefined
  SignUp: undefined
  Settings: undefined
  Signaling: undefined
  CreateCredentials: undefined
  Search: undefined
}

export default function AppNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  const { isAuthenticated, isLoading, user } = useAuth()

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
          initialRouteName={!user?.username ? "CreateCredentials" : "Home"}>
          <>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            {!user?.username ? (
              <Stack.Screen
                name="CreateCredentials"
                options={{ headerShown: false }}
                component={CreateCredentials}
              />
            ) : (
              <>
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
              </>
            )}
          </>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="EntryScreen">
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
