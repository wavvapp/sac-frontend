import { useQuery } from "@tanstack/react-query"
import api from "@/service"
import { Friend, FriendSignal, User } from "@/types"

export const useFriends = (shouldRefetch?: boolean) => {
  return useQuery<Friend[], Error>({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await api.get("/friends")
      return data
    },
    staleTime: Infinity,
    refetchInterval: shouldRefetch ? 5000 : false,
    placeholderData: [],
  })
}

export const useSignalingFriends = (shouldRefetch?: boolean) => {
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
    placeholderData: [],
    refetchInterval: shouldRefetch ? 5000 : false,
    retry: 1,
  })
}
