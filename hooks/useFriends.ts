import api from "@/service"
import { FriendSignal, User } from "@/types"
import { useEffect, useMemo, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState<FriendSignal[]>([])
  const [availableFriends, setAvailableFriends] = useState<User[]>([])

  const offlineFriends = useMemo(() => {
    const friendsData = friends.filter(
      (friend) =>
        !availableFriends.some(
          (availableFriend) => availableFriend.id === friend.id,
        ),
    )
    const formattedFriends: User[] = friendsData.map(
      (friend: FriendSignal) => ({
        id: friend.user.id,
        name: friend.user.names,
        username: friend.user.username,
        imageUrl: friend.user.profilePictureUrl,
        time: friend?.when,
        activity: friend.status_message,
      }),
    )
    return formattedFriends
  }, [friends, availableFriends])

  const hasFriends = useMemo(() => {
    return friends.length !== 0
  }, [friends])

  const fetchAvailableFriends = async () => {
    try {
      const { data } = await api.get("/friend-signals")
      if (data) {
        const formattedFriends: User[] = data.map((friend: FriendSignal) => ({
          id: friend.user.id,
          name: friend.user.names,
          username: friend.user.username,
          imageUrl: friend.user.profilePictureUrl,
          time: friend?.when,
          activity: friend.status_message,
        }))
        setAvailableFriends(formattedFriends)
      }
    } catch (error) {
      console.error("Error fetching friends:", error)
      throw error
    }
  }
  const fetchAllFriends = async () => {
    try {
      const { data } = await api.get("/friends")
      if (data) {
        setFriends(data)
      }
      return
    } catch (error) {
      console.error("Error fetching friends", error)
    }
  }

  useEffect(() => {
    fetchAllFriends()
    fetchAvailableFriends()
  }, [])
  return { hasFriends, availableFriends, offlineFriends }
}
