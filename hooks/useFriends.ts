import api from "@/service"
import { FriendSignal, User } from "@/types"
import { useCallback, useMemo, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [availableFriends, setAvailableFriends] = useState<User[]>([])

  const offlineFriends = useMemo(() => {
    const friendsData = friends.filter(
      (friend) =>
        !availableFriends.some(
          (availableFriend) => availableFriend.id === friend.id,
        ),
    )
    const formattedFriends: User[] = friendsData.map((friend: User) => ({
      id: friend.id,
      names: friend.names,
      username: friend.username,
      email: friend.email,
      profilePictureUrl: friend.profilePictureUrl,
    }))
    return formattedFriends
  }, [friends, availableFriends])

  const hasFriends = useMemo(() => {
    return friends.length !== 0
  }, [friends])

  const fetchAvailableFriends = useCallback(async () => {
    try {
      const { data } = await api.get("/friend-signals")
      if (data) {
        const formattedFriends: User[] = data.map((friend: FriendSignal) => ({
          id: friend.user.id,
          names: friend.user.names,
          username: friend.user.username,
          profilePictureUrl: friend.user.profilePictureUrl,
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
    }
  }, [])

  return {
    friends,
    hasFriends,
    availableFriends,
    offlineFriends,
    fetchAllFriends,
    fetchAvailableFriends,
  }
}
