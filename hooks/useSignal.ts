import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { Signal } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useFetchMySignal = () => {
  const { isAuthenticated } = useAuth()
  return useQuery<Signal, Error>({
    queryKey: ["fetch-my-signal"],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")
      const signal = {
        ...data,
        friendIds: data.friends.map((friend: any) => friend?.friendId),
      }
      return signal
    },
    initialData: {
      when: "NOW",
      status_message: "a status message",
      friends: [],
      friendIds: [],
    },
    enabled: isAuthenticated,
  })
}
