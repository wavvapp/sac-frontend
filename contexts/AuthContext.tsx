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
import { CredentialsScreenProps } from "@/screens/Authentication/SignUp/CreateCredentials"
import * as AppleAuthentication from "expo-apple-authentication"

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signInWithGoogle: (navigation: CredentialsScreenProps) => Promise<void>
  signOut: () => Promise<void>
  updateUserInfo: (activity: string, time: string) => Promise<void>
  isAuthenticated: boolean
  isNewUser: boolean
  signUp: (username: string) => Promise<void>
  signInWithApple: () => Promise<void>
}
interface ExtendedUser extends User {
  access_token: string
  refresh_token: string
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [googleToken, setGoogleToken] = useState<string | null>(null)
  const [isNewUser, setIsNewUser] = useState<boolean>(false)

  useEffect(() => {
    loadStoredData()
  }, [])
  async function signIn(userData: ExtendedUser): Promise<void> {
    try {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        id,
        email,
        names,
        username,
        profilePictureUrl,
      } = userData
      const user: User = {
        id,
        names,
        email,
        username,
        profilePictureUrl: profilePictureUrl,
      }
      await AsyncStorage.setItem("@Auth:accessToken", accessToken)
      await AsyncStorage.setItem("@Auth:refreshToken", refreshToken)
      await AsyncStorage.setItem("@Auth:user", JSON.stringify(user))
      setUser(userData)
    } catch (err) {
      console.log("error with saving user info")
    }
  }

  const signUp = async (username: string) => {
    if (!username || !googleToken) return
    const { data } = await api.post("/auth/google-signin", {
      token: googleToken,
      username,
      platform: Platform.OS === "ios" ? "web" : "android",
    })
    setIsNewUser(false)
    await signIn(data)
  }

  const signInWithGoogle = async (navigation: CredentialsScreenProps) => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setIsLoading(true)
        const idToken = response.data.idToken
        const { data, status } = await api.post("/auth/google-signin", {
          token: idToken,
          platform: Platform.OS === "ios" ? "web" : "android",
        })
        setGoogleToken(idToken)
        if (status === 202) {
          setIsNewUser(true)
          navigation.navigate("CreateCredentials")
          return
        }
        await signIn(data)
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

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      console.log("Apple Sign-In Success:", credential)

      if (credential.identityToken) {
        const payload = {
          token: credential.identityToken,
          platform: Platform.OS === "ios" ? "web" : "android",
          name: `${credential.fullName?.givenName ?? ""} ${
            credential.fullName?.familyName ?? ""
          }`.trim(),
        }
        const { data, status } = await api.post("/auth/google-signin", payload)
        console.log(data, "data")
        console.log(status, "status")
      }
    } catch (error) {
      console.error("Error while signing in: ", error)
    }
  }

  async function loadStoredData(): Promise<void> {
    setIsLoading(true)

    const storedUser = await AsyncStorage.getItem("@Auth:user")
    const storedToken = await AsyncStorage.getItem("@Auth:accessToken")

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem("@Auth:accessToken")
    await AsyncStorage.removeItem("@Auth:user")
    await AsyncStorage.removeItem("@Auth:refreshToken")

    setUser(null)
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
        signInWithGoogle,
        signOut,
        updateUserInfo,
        isAuthenticated: !!user && !isLoading,
        isNewUser,
        signUp,
        signInWithApple,
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
