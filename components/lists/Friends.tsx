import { StyleSheet, View } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { useEffect, useState } from "react"
import api from "@/service"
import { Friend } from "@/types"

export default function FriendsList() {
  const [, setSelectedFriends] = useState<Friend[]>([])
  const [friendsList, setFriendsList] = useState<Friend[]>([])

  const fetchFriends = async () => {
    try {
      const response = await api.get("/friends")
      const friends = response.data.map((friend: any) => ({
        id: friend.id,
        name: friend.name,
        email: friend.email,
        imageUrl: friend.profile || "",
        selected: false,
      }))
      console.log(friends, "MY FRIENDS")
      setSelectedFriends(friends)
      setFriendsList(friends)
    } catch (error) {
      console.error("error fetching friends", error)
    }
  }

  useEffect(() => {
    fetchFriends()
  }, [])
  const updateFriendsList = (friendId: string) => {
    setFriendsList((prevList) =>
      prevList.map((friend) =>
        friend.id === friendId
          ? { ...friend, selected: !friend.selected }
          : friend,
      ),
    )
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
