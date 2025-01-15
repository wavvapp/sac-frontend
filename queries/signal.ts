import api from "@/service"
import { Friend, Signal } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const useMySignal = () => {
  return useQuery<Signal, Error>({
    queryKey: ["fetch-my-signal"],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")
      const signal = {
        ...data,
        friendIds: data.friends.map((friend: Friend) => friend?.friendId),
      }
      return signal
    },
    staleTime: 10000,
  })
}
