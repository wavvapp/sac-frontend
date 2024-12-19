import api from "@/service"
import { Signal } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useFriends } from "@/queries/friends"

export const useMySignal = () => {
  const { isSuccess } = useFriends()
  return useQuery<Signal, Error>({
    queryKey: ["fetch-my-signal", isSuccess],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")
      const signal = {
        ...data,
        friendIds: data.friends.map((friend: any) => friend?.friendId),
      }
      return signal
    },
    placeholderData: {
      when: "NOW",
      status_message: "Available",
      friends: [],
      friendIds: [],
    },
    enabled: isSuccess,
  })
}
