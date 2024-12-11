import { Provider } from "@/contexts/AuthContext"
import api from "@/service"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Payload {
  token: string | null
  platform: string
  provider: Provider
  email?: string | null
  names?: string | null
}

export const handleApiSignIn = async (payload: Payload) => {
  await AsyncStorage.setItem("@Auth:provider", payload.provider)
  if (payload.names) {
    await AsyncStorage.setItem("@Auth:names", payload.names)
  }

  return api.post("/auth/signin", payload)
}
