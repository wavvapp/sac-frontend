import * as SplashScreen from "expo-splash-screen"
import "react-native-reanimated"
import AppNavigator from "./navigation"
import { AuthProvider } from "./contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFont } from "@/hooks/useFont"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NotificationProvider } from "./contexts/NotificationContext"
import * as Notifications from "expo-notifications"
import useInAppUpdates from "./hooks/useInAppUpdate"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const appEnvironment = process.env.APP_ENVIRONMENT

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    const notificationEnvironment =
      notification.request.content.data?.environment ||
      // @ts-ignore
      // NOTE: dataString is not defined in the notification request content interface
      JSON.parse(notification.request.content?.dataString || "").environment

    if (notificationEnvironment) {
      const shouldShowNotification = notificationEnvironment === appEnvironment

      if (shouldShowNotification) {
        return {
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
          priority: Notifications.AndroidNotificationPriority.MAX,
        }
      }

      return {
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        priority: Notifications.AndroidNotificationPriority.MIN,
      }
    }

    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    }
  },
})

const queryClient = new QueryClient()

export default function App() {
  const { loaded, error } = useFont()
  useInAppUpdates()

  if (!loaded && !error) {
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <SafeAreaProvider>
          <StatusBar style="inverted" />
          <AuthProvider>
            <GestureHandlerRootView>
              <AppNavigator />
            </GestureHandlerRootView>
          </AuthProvider>
        </SafeAreaProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}
