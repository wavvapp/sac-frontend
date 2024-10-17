import { StyleSheet, View } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { useState } from "react"
import { defaultUsers } from "@/data/users"
import { FlatList } from "react-native-gesture-handler"
import ShareCard from "@/components/Share"

export default function FriendsList() {
  const [friendsList, setfriendsList] = useState(defaultUsers)
  const updateFriendsList = (userId: string) => {
    setfriendsList((prevList) =>
      prevList.map((user) =>
        user.id === userId ? { ...user, selected: !user.selected } : user,
      ),
    )
  }
  return (
    <View style={styles.container}>
      <CustomText size="sm" fontWeight="medium" fontFamily="suisse">
        Who can see it
      </CustomText>
      <FlatList
        data={friendsList}
        renderItem={({ item }) => (
          <FriendCard
            handleChange={() => updateFriendsList(item.id)}
            user={item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <ShareCard />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 30,
    width: "100%",
    paddingHorizontal: 20,
  },
})
