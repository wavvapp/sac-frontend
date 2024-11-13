import api from "@/service"
import { FriendSignal, User } from "@/types"
import { useCallback, useEffect, useMemo, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [availableFriends, setAvailableFriends] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const offlineFriends = useMemo(() => {
    const friendsData = friends.filter(
      (friend) =>
        !availableFriends.some(
          (availableFriend) => availableFriend.id === friend.id,
        ),
    )
    return friendsData
  }, [friends, availableFriends])

  const hasFriends = useMemo(() => {
    if (isLoading) return true
    return friends.length !== 0
  }, [friends, isLoading])

  const fetchAvailableFriends = useCallback(async () => {
    try {
      const { data } = await api.get("/friend-signals")
      if (data) {
        const formattedFriends: User[] = data.map((friend: FriendSignal) => ({
          ...friend.user,
          time: friend?.when,
          activity: friend.status_message,
        }))
        setAvailableFriends(formattedFriends)
      }
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
      return
    } catch (error) {
      console.error("Error fetching friends", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
    isLoading,
  }
}
