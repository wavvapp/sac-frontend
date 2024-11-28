import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin"
import { Platform } from "react-native"
import { User } from "@/types"
import api from "@/service"

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signIn: (token: string, user: User) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateUserInfo: (activity: string, time: string) => Promise<void>
  isAuthenticated: boolean
  fetchCurrentUser: () => Promise<void>
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
    await AsyncStorage.setItem("@Auth:accessToken", token)
    await AsyncStorage.setItem("@Auth:user", JSON.stringify(userData))

    setUser(userData)
  }

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setIsLoading(true)
        const idToken = response.data.idToken
        const { data } = await api.post("/auth/google-signin", {
          token: idToken,
          platform: Platform.OS === "ios" ? "web" : "android",
        })
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          id,
          email,
          names,
          username,
          profilePictureUrl,
        } = data
        const user: User = {
          id,
          names,
          email,
          username,
          profilePictureUrl: profilePictureUrl,
        }
        await AsyncStorage.setItem("@Auth:accessToken", accessToken)
        await AsyncStorage.setItem("@Auth:refreshToken", refreshToken)
        await signIn(accessToken, user)
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break
          default:
            console.error("Error:", error)
        }
      } else {
        console.error("Unexpected Error:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function loadStoredData(): Promise<void> {
    setIsLoading(true)

    const storedUser = await AsyncStorage.getItem("@Auth:user")
    const storedToken = await AsyncStorage.getItem("@Auth:accessToken")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }

    // SplashScreen.hideAsync()
    setIsLoading(false)
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem("@Auth:accessToken")
    await AsyncStorage.removeItem("@Auth:user")
    await AsyncStorage.removeItem("@Auth:refreshToken")

    setUser(null)
  }

  async function fetchCurrentUser(): Promise<void> {
    try {
      setIsLoading(true)
      const { data } = await api.get("/auth/current-user")
      const { id, names, username, email } = data
      setUser({
        id,
        names,
        username,
        email,
      })
      await AsyncStorage.setItem(
        "@Auth:user",
        JSON.stringify({
          id,
          names,
          username,
        }),
      )
    } catch (error) {
      console.error("Failed to re-fetch user", error)
    } finally {
      setIsLoading(false)
    }
  }
  async function updateUserInfo(activity: string, time: string) {
    if (!user) return
    const updatedUserInfo: User = { ...user, time, activity }
    await AsyncStorage.setItem("@Auth:user", JSON.stringify(updatedUserInfo))
    setUser(updatedUserInfo)
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signInWithGoogle,
        signOut,
        updateUserInfo,
        isAuthenticated: !!user,
        fetchCurrentUser,
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
