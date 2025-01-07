import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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

export const useAddFriend = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (friendId: string) => api.post("/friends", { friendId }),
    onMutate: async (friendId) => {
      await queryClient.cancelQueries({
        queryKey: ["users"],
        exact: false,
      })

      const previousUsers =
        queryClient
          .getQueriesData({
            queryKey: ["users"],
            exact: false,
          })
          .slice(-1)[0]?.[1] || []
      queryClient.setQueriesData(
        { queryKey: ["users"], exact: false },
        (oldUsers: User[] = []) =>
          oldUsers.map((user) =>
            user.id === friendId ? { ...user, isFriend: true } : user,
          ),
      )
      return { previousUsers }
    },
    onError: (err, friendId, context) => {
      queryClient.setQueriesData(
        { queryKey: ["users"], exact: false },
        context?.previousUsers,
      )
      console.error("Error adding friend:", err)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"], exact: false })
      queryClient.invalidateQueries({ queryKey: ["friends"] })
    },
  })
}
