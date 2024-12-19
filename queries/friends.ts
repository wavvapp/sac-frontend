import { useQuery } from "@tanstack/react-query"
import api from "@/service"
import { Friend, FriendSignal, User } from "@/types"
import { useAuth } from "@/contexts/AuthContext"

export const useFriends = () => {
  const { isAuthenticated } = useAuth()
  return useQuery<Friend[], Error>({
    queryKey: ["friends"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/friends")
        return data
      } catch (error) {
        console.error("Failed to fetch friends:", error)
        return []
      }
    },
    staleTime: Infinity,
    enabled: isAuthenticated,
    initialData: [],
  })
}

export const useSignalingFriends = () => {
  return useQuery<User[], Error>({
    queryKey: ["friend-signals"],
    queryFn: async () => {
      const { data } = await api.get("/friend-signals")
      const friendSignals = data.map((friend: FriendSignal) => ({
        ...friend,
        time: friend.signal.when,
        activity: friend.signal.status_message,
      }))
      return friendSignals
    },
    initialData: [],
    retry: 1,
  })
}
