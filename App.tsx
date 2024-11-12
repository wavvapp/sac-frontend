import * as SplashScreen from "expo-splash-screen"
import "react-native-reanimated"
import AppNavigator from "./navigation"
import { AuthProvider } from "./contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useFont } from "@/hooks/useFont"
import { useEffect } from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function App() {
  const { loaded, error } = useFont()

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error])

  if (!loaded && !error) {
    return null
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="inverted" />
        <AuthProvider>
          <GestureHandlerRootView>
            <AppNavigator />
          </GestureHandlerRootView>
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
