import { StyleSheet, View } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { useState } from "react"
import { availableFriends } from "@/data/users"

export default function FriendsList() {
  const [friendsList, setFriendsList] = useState(availableFriends)
  const updateFriendsList = (userId: string) => {
    setFriendsList((prevList) =>
      prevList.map((user) =>
        user.id === userId ? { ...user, selected: !user.selected } : user,
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
