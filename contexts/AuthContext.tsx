import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from "expo-splash-screen"
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"

interface User {
  id: string
  name: string | null
  email: string
  photo: string | null
  familyName: string | null
  givenName: string | null
}

type HomeProp = NativeStackNavigationProp<RootStackParamList, "Home">

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStoredData()
  }, [])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        await AsyncStorage.setItem("@Auth:token", response.data.idToken ?? "")
        await AsyncStorage.setItem(
          "@Auth:user",
          JSON.stringify(response.data.user),
        )
        setUser(response.data.user)
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  }

  async function loadStoredData(): Promise<void> {
    setIsLoading(true)

    const storedUser = await AsyncStorage.getItem("@Auth:user")
    const storedToken = await AsyncStorage.getItem("@Auth:token")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }

    SplashScreen.hideAsync()
    // setIsLoading(false)
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem("@Auth:token")
    await AsyncStorage.removeItem("@Auth:user")

    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
