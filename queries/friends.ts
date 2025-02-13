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
  return useQuery<Friend[], Error>({
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
    mutationFn: ({
      friendId,
      hasNotificationEnabled,
    }: {
      friendId: string
      hasNotificationEnabled: boolean
    }) =>
      api.post("/friends", {
        friendId,
        hasNotificationEnabled,
      }),
    onMutate: async ({ friendId }) => {
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

export const useRemoveFriend = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (friendId: string) =>
      api.post(`/friends/unfriend`, { friendId }),

    onMutate: async (friendId) => {
      await Promise.all([
        queryClient.cancelQueries({
          queryKey: ["users"],
          exact: false,
        }),
        queryClient.cancelQueries({
          queryKey: ["friends"],
        }),
      ])

      const previousUsers =
        queryClient
          .getQueriesData({ queryKey: ["users"], exact: false })
          .slice(-1)[0]?.[1] || []
      const previousFriends = queryClient.getQueryData(["friends"]) ?? []

      queryClient.setQueriesData(
        { queryKey: ["users"], exact: false },
        (old: User[] = []) =>
          old.map((user) =>
            user.id === friendId ? { ...user, isFriend: false } : user,
          ),
      )

      queryClient.setQueryData(["friends"], (old: Friend[] = []) =>
        old.filter((friend) => friend.id !== friendId),
      )

      return { previousUsers, previousFriends }
    },
    onError: (err, friendId, context) => {
      if (context) {
        queryClient.setQueryData(["users"], context.previousUsers)
        queryClient.setQueryData(["friends"], context.previousFriends)
      }
      console.error("Error removing friend:", friendId, err)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["friends"] })
    },
  })
}

export const useSetNotificationPreferences = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      enableNotification: boolean
      friendId: string
    }) => {
      return await api.patch("/friends/notification/settings", payload)
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: ["friends"],
      })
      const oldFriends = queryClient.getQueryData<Friend[]>(["friends"]) || []
      await queryClient.setQueryData(
        ["friends"],
        oldFriends.map((friend) =>
          friend.id === payload.friendId
            ? {
                ...friend,
                hasNotificationEnabled: payload.enableNotification,
              }
            : friend,
        ),
      )
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["friends"] })
    },
  })
}
