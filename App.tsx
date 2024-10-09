import * as SplashScreen from "expo-splash-screen"
import "react-native-reanimated"
import AppNavigator from "./navigation"
import { AuthProvider } from "./contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="inverted" />
      <AuthProvider>
        <GestureHandlerRootView>
          <AppNavigator />
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  )
}
