import api from "@/service"
import { FriendSignal, User } from "@/types"
import { useCallback, useEffect, useMemo, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [availableFriends, setAvailableFriends] = useState<User[]>([])
  const [offlineFriends, setOfflineFriends] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const filterOfflinefriends = (friends: User[], availableFriends: User[]) => {
    const friendsData = friends.filter(
      (friend) =>
        !availableFriends.some(
          (availableFriend) => availableFriend.id === friend.id,
        ),
    )
    return friendsData
  }

  const hasFriends = useMemo(() => {
    if (isLoading) return true
    return friends.length !== 0
  }, [friends, isLoading])

  const fetchAvailableFriends = useCallback(async () => {
    try {
      const { data } = await api.get("/friend-signals")
      if (data) {
        const formattedFriends: User[] = data.map((friend: FriendSignal) => ({
          ...friend,
          time: friend.signal.when,
          activity: friend.signal.status_message,
        }))
        setAvailableFriends(formattedFriends)
        return formattedFriends
      } else return []
    } catch (error) {
      console.error("Error fetching available friends:", error)
      throw error
    }
  }, [])
  const fetchAllFriends = useCallback(async () => {
    try {
      const { data } = await api.get("/friends")
      if (data) {
        setFriends(data)
      }
      return data
    } catch (error) {
      console.error("Error fetching friends", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSignalingFriends = async () => {
    const [allFriends, onlineFriends] = await Promise.all([
      fetchAllFriends(),
      fetchAvailableFriends(),
    ])
    setAvailableFriends(onlineFriends)
    const offlineFriends = filterOfflinefriends(allFriends, onlineFriends)
    setOfflineFriends(offlineFriends)
    return { onlineFriends, offlineFriends }
  }

  useEffect(() => {
    fetchAllFriends()
  }, [fetchAllFriends])

  return {
    friends,
    hasFriends,
    availableFriends,
    offlineFriends,
    fetchAllFriends,
    fetchAvailableFriends,
    fetchSignalingFriends,
    isLoading,
  }
}
