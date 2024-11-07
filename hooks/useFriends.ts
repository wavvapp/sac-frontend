import api from "@/service"
import { useEffect, useMemo, useState } from "react"

export const useFriends = () => {
  const [friends, setFriends] = useState([])
  const [availableFriends, setAvailableFriends] = useState([])

  const offlineFriends = useMemo(() => {
    return friends.filter((friend) => !availableFriends.includes(friend)) || []
  }, [friends, availableFriends])

  const hasFriends = useMemo(() => {
    return friends.length !== 0
  }, [friends])

  const fetchAvailableFriends = async () => {
    try {
      const { data } = await api.get("/friend-signals")
      if (data) {
        setAvailableFriends({
          ...data,
          id: data?.friendId || "",
          name: data?.user?.names,
          username: data?.user?.username || "",
          email: data?.user?.email,
          imageUrl: data?.user?.profilePictureUrl || "",
        })
      }
      return
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
