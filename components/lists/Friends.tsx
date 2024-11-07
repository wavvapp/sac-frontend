import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import api from "@/service"
import { Friend } from "@/types"
import { useStatus } from "@/contexts/StatusContext"

export default function FriendsList() {
  const { friends, setFriends } = useStatus()
  const [friendsList, setFriendsList] = useState<Friend[]>([])

  const fetchFriends = async () => {
    try {
      const response = await api.get("/friends")
      const allFriends = response.data.map((friend: any) => ({
        id: friend.friendId,
        name: friend.user.names,
        username: friend.user.username || "",
        email: friend.user.email,
        imageUrl: friend.user.profilePictureUrl || "",
        selected: friends.includes(friend.friendId),
      }))
      setFriendsList(allFriends)
    } catch (error) {
      console.error("Error fetching friends", error)
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [friends])

  const updateFriendsList = (friendId: string) => {
    const updatedFriends = friends.includes(friendId)
      ? friends.filter((id) => id !== friendId)
      : [...friends, friendId]
    setFriends(updatedFriends)
  }

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {friendsList.map((item) => (
        <FriendCard
          key={item.id.toString()}
          handleChange={() => updateFriendsList(item.id)}
          user={item}
        />
      ))}
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
