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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
})

const queryClient = new QueryClient()

export default function App() {
  const { loaded, error } = useFont()

  if (!loaded && !error) {
    return null
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <SafeAreaProvider>
            <StatusBar style="inverted" />
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
          </SafeAreaProvider>
        </NotificationProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
