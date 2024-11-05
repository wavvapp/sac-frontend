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
import axios from "axios"
import { Platform } from "react-native"
import { User } from "@/types"

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signIn: (token: string, user: User) => Promise<void>
  signInWithGoogle: () => Promise<void>
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
  async function signIn(token: string, userData: User): Promise<void> {
    await AsyncStorage.setItem("@Auth:token", token)
    await AsyncStorage.setItem("@Auth:user", JSON.stringify(userData))

    setUser(userData)
  }

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken ?? ""

        const { data: autheeticatedUser } = await axios.post(
          `${process.env.API_BASE_URL}/auth/google-signin`,
          {
            token: idToken,
            platform: Platform.OS === "ios" ? "web" : "android",
          },
        )
        const { id, names, access_token, username } = autheeticatedUser
        setUser({
          id,
          name: names,
          username,
        })
        await AsyncStorage.setItem("@Auth:token", access_token)
        await AsyncStorage.setItem(
          "@Auth:user",
          JSON.stringify({
            id,
            name: names,
            username,
          }),
        )
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break
          default:
        }
      } else {
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
    setIsLoading(false)
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
        signInWithGoogle,
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
