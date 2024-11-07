import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import api from "@/service"
import { Friend } from "@/types"
import { useStatus } from "@/contexts/StatusContext"

export default function FriendsList() {
  const { friends, setFriends } = useStatus() // Access friends and setFriends from context
  const [friendsList, setFriendsList] = useState<Friend[]>([])

  const fetchFriends = async () => {
    try {
      const response = await api.get("/friends")
      const allFriends = response.data.map((friend: any) => ({
        id: friend.id,
        name: friend.name,
        email: friend.email,
        imageUrl: friend.profile || "",
        selected: friends.includes(friend.id), // Check if the friend is selected
      }))

      setFriendsList(allFriends) // Update the local state with the list of friends
    } catch (error) {
      console.error("Error fetching friends", error)
    }
  }

  useEffect(() => {
    fetchFriends() // Call the function to fetch friends when the component mounts
  }, [friends]) // Re-fetch when friends change

  const updateFriendsList = (friendId: string) => {
    setFriends((prevFriends) => {
      // Ensure that prevFriends is an array of strings
      const updatedFriends = prevFriends.includes(friendId)
        ? prevFriends.filter((id) => id !== friendId) // Deselect the friend
        : [...prevFriends, friendId] // Select the friend
      return updatedFriends // Return the updated array
    })
  }

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {friendsList.map((item) => (
        <FriendCard
          key={item.id.toString()}
          handleChange={() => updateFriendsList(item.id)} // Update friends list when changed
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
