import {
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
import { Provider, User } from "@/types"
import { CredentialsScreenProps } from "@/screens/Authentication/SignUp/CreateCredentials"
import * as AppleAuthentication from "expo-apple-authentication"
import { handleApiSignIn } from "@/libs/handleApiSignIn"
import { useQueryClient } from "@tanstack/react-query"
import AlertDialog from "@/components/AlertDialog"
import { useOfflineHandler } from "@/hooks/useOfflineHandler"
import { usePrefetch } from "@/hooks/useSplashScreen"

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signInWithGoogle: (navigation: CredentialsScreenProps) => Promise<void>
  signOut: () => Promise<void>
  updateUserInfo: (activity: string, time: string) => Promise<void>
  isAuthenticated: boolean
  isNewUser: boolean
  registerUser: (username: string) => Promise<void>
  signInWithApple: (navigation: CredentialsScreenProps) => Promise<void>
  isOnline: boolean
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
  const [currentToken, setCurrentToken] = useState<string | null>(null)
  const [isNewUser, setIsNewUser] = useState<boolean>(false)
  const { isOnline } = useOfflineHandler()
  const queryClient = useQueryClient()
  const { startPrefetch } = usePrefetch()

  async function completeSignIn(userData: ExtendedUser): Promise<void> {
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
      await startPrefetch()
      setUser(userData)
    } catch (err) {
      console.error("error with saving user info")
    }
  }

  const registerUser = async (username: string) => {
    try {
      if (!username || !currentToken) return
      const provider = await AsyncStorage.getItem("@Auth:provider")
      const names = await AsyncStorage.getItem("@Auth:names")
      if (!provider) return
      const { data } = await handleApiSignIn({
        token: currentToken,
        username,
        provider,
        names,
        platform: Platform.OS === "ios" ? "web" : "android",
      })
      setIsNewUser(false)
      queryClient.setQueryData(["friends"], [])
      await completeSignIn(data)
    } catch (error) {
      console.error("Error when signing up: ", error)
    }
  }

  const signInWithGoogle = async (navigation: CredentialsScreenProps) => {
    try {
      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()
      if (isSuccessResponse(response)) {
        setIsLoading(true)
        const idToken = response.data.idToken
        const payload = {
          token: idToken,
          platform: Platform.OS === "ios" ? "web" : "android",
          provider: Provider.GOOGLE,
        }
        await AsyncStorage.setItem("@Auth:provider", payload.provider)
        const { data, status } = await handleApiSignIn(payload)
        setCurrentToken(idToken)
        if (status === 202) {
          setIsNewUser(true)
          navigation.navigate("CreateCredentials")
          return
        }
        await completeSignIn(data)
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

  const signInWithApple = async (navigation: CredentialsScreenProps) => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (credential.identityToken) {
        const payload = {
          token: credential.identityToken,
          platform: Platform.OS === "ios" ? "web" : "android",
          provider: Provider.APPLE,
          email: credential.email,
          names:
            `${credential.fullName?.familyName ?? ""} ${credential.fullName?.middleName ?? ""} ${credential.fullName?.givenName ?? ""}`.trim(),
        }
        await AsyncStorage.setItem("@Auth:provider", payload.provider)
        const { data, status } = await handleApiSignIn(payload)
        setCurrentToken(payload.token)
        if (status === 202) {
          setIsNewUser(true)
          navigation.navigate("CreateCredentials")
          return
        }
        await completeSignIn(data)
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
    await startPrefetch()
    setIsLoading(false)
  }

  useEffect(() => {
    loadStoredData()
  }, [])

  async function signOut(): Promise<void> {
    await AsyncStorage.removeItem("@Auth:accessToken")
    await AsyncStorage.removeItem("@Auth:user")
    await AsyncStorage.removeItem("@Auth:refreshToken")
    queryClient.clear()
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
        registerUser,
        signInWithApple,
        isOnline,
      }}>
      {children}
      {!isOnline && (
        <AlertDialog
          title="No connection"
          description="Make sure that you are connected to the internet and try again"
        />
      )}
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
