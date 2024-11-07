import api from "@/service"
import { User } from "@/types"
import { useEffect, useMemo, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState<User[]>([])
  const [availableFriends, setAvailableFriends] = useState<User[]>([])

  const offlineFriends = useMemo(() => {
    return (
      friends.filter(
        (friend) => !availableFriends.some((user) => user.id === friend.id),
      ) || []
    )
  }, [friends, availableFriends])

  const hasFriends = useMemo(() => {
    return friends.length !== 0
  }, [friends])

  const fetchAvailableFriends = async () => {
    try {
      const { data } = await api.get("/friend-signals")
      if (data) {
        const friendsArray = Array.isArray(data) ? data : [data]
        const formattedFriends = friendsArray.map((friend) => ({
          id: friend?.friendId || "",
          name: friend?.user?.names || "",
          username: friend?.user?.username || "",
          email: friend?.user?.email || "",
          imageUrl: friend?.user?.profilePictureUrl || "",
          time: "",
          activity: "",
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
