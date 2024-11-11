import { useState, useEffect, useCallback } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import api from "@/service"
import { User } from "@/types"
import { useStatus } from "@/contexts/StatusContext"
import { useSignal } from "@/hooks/useSignal"

export default function FriendsList() {
  const { friends, setFriends } = useStatus()
  const [friendsList, setFriendsList] = useState<User[]>([])
  const { signal } = useSignal()

  const fetchFriends = useCallback(async () => {
    try {
      const response = await api.get("/friends")
      const allFriends = response.data.map((friend: User) => ({
        id: friend.id,
        names: friend.names,
        username: friend.username || "",
        email: friend.email,
        profilePictureUrl: friend.profilePictureUrl || "",
        selected: signal?.friends.some(
          (signalFriend) => signalFriend.username === friend.username,
        ),
      }))
      setFriendsList(allFriends)
    } catch (error) {
      console.error("Error fetching friends", error)
    }
  }, [signal?.friends])

  useEffect(() => {
    fetchFriends()
  }, [fetchFriends])

  const updateFriendsList = useCallback(
    (friendId: string) => {
      const updatedUserList = friendsList.map((friend) => {
        if (friend.id === friendId) {
          if (!friend.selected) {
            setFriends([...friends, friendId])
            friend.selected = true
          } else {
            setFriends(friends.filter((id) => id !== friendId))
            friend.selected = false
          }
        }
        return friend
      })
      setFriendsList(updatedUserList)
    },
    [friends, friendsList, setFriends],
  )

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {[...new Set(friendsList)].map((item, i) => {
        return (
          <FriendCard
            key={i}
            handleChange={() => updateFriendsList(item.id)}
            user={item}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
  },
})
