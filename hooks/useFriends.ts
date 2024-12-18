import { useQuery, useQueryClient } from "@tanstack/react-query"
import api from "@/service"
import { Friend, FriendSignal } from "@/types"

export const useFriends = () => {
  const queryClient = useQueryClient()
  const {
    data: allFriends = [],
    isLoading: isFriendsLoading,
    refetch: refetchAllFriends,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data } = await api.get("/friends")
      return data || []
    },
    retry: 1,
  })

  const {
    data: availableFriends = [],
    isLoading: isAvailableFriendsLoading,
    refetch: refetchAvailableFriends,
  } = useQuery({
    queryKey: ["friend-signals"],
    queryFn: async () => {
      const { data } = await api.get("/friend-signals")
      return data
        ? data.map((friend: FriendSignal) => ({
            ...friend,
            time: friend.signal.when,
            activity: friend.signal.status_message,
          }))
        : []
    },
    retry: 1,
  })
  const offlineFriends = allFriends.filter(
    (friend: Friend) =>
      !availableFriends.some(
        (availableFriend: Friend) => availableFriend.id === friend.id,
      ),
  )

  const isLoading = isFriendsLoading || isAvailableFriendsLoading
  const refetch = async () => {
    await Promise.all([refetchAllFriends(), refetchAvailableFriends()])
  }

  const instantRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["friends"] })
    await queryClient.invalidateQueries({ queryKey: ["friend-signals"] })
    return refetch()
  }
  return {
    allFriends,
    availableFriends,
    offlineFriends,
    isLoading,
    refetch,
    instantRefresh,
  }
}
