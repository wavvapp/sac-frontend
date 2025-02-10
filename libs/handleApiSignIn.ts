import api from "@/service"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Payload {
  token: string | null
  platform: string
  provider: string
  email?: string | null
  names?: string | null
  username?: string
}

export const handleApiSignIn = async (payload: Payload) => {
  // if (payload.names) {
  //   await AsyncStorage.setItem("@Auth:names", payload.names)
  // }

  return api.post("/auth/signin", payload)
}
