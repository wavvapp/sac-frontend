import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from "expo-splash-screen"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  user: User | null
  isLoading: boolean
  signIn: (token: string, user: User) => Promise<void>
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

  async function signIn(token: string, userData: User): Promise<void> {
    await AsyncStorage.setItem("@Auth:token", token)
    await AsyncStorage.setItem("@Auth:user", JSON.stringify(userData))

    setUser(userData)
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
