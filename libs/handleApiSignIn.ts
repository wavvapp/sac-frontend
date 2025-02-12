import api from "@/service"

interface Payload {
  token: string | null
  platform: string
  provider: string
  email?: string | null
  names: string
  username?: string
}

export const handleApiSignIn = async (payload: Payload) => {
  return api.post("/auth/signin", payload)
}
