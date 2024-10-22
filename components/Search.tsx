import { View, StyleSheet, Text, ScrollView } from "react-native"
import Input from "@/components/ui/Input"
import UserInfo from "@/components/UserInfo"
import CheckBox from "@/components/ui/CheckBox" // You can remove this if not using
import ShareCard from "@/components/Share"
import { CustomButton } from "@/components/ui/Button"
import { useState } from "react"
import { AntDesign } from "@expo/vector-icons"
import { availableFriends } from "@/data/users"
import { useNavigation } from "@react-navigation/native"
import UserAvatar from "@/components/ui/UserAvatar"

const FindFriends = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState("")
  const [addedFriends, setAddedFriends] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [filteredFriends, setFilteredFriends] = useState(availableFriends)

  const handleSearch = (text: string) => {
    setSearch(text)
    const filtered = availableFriends
      .filter((friend) =>
        `${friend.firstName} ${friend.lastName} ${friend.username}`
          .toLowerCase()
          .includes(text.toLowerCase()),
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
    setFilteredFriends(filtered)
  }

  const handleAddFriend = (id: string) => {
    setAddedFriends((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <Text style={styles.title}>Find Friends</Text>
        <AntDesign name="close" size={24} color="black" onPress={handleClose} />
      </View>
      <Input
        variant="primary"
        textSize="base"
        value={search}
        placeholder="Search by name or username"
        handleTextChange={handleSearch}
      />

      <ScrollView style={styles.friendsList}>
        {search ? (
          filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => (
              <View key={friend.id} style={styles.friendItem}>
                <View style={styles.userDetails}>
                  <UserAvatar imageUrl={friend.imageUrl || 0} />
                  <View style={{ marginLeft: 8 }}>
                    <UserInfo
                      firstName={friend.firstName}
                      lastName={friend.lastName}
                      username={friend.username}
                    />
                  </View>
                </View>
                {addedFriends[friend.id] ? (
                  <CheckBox isChecked={true} />
                ) : (
                  <CustomButton
                    variant="outline"
                    title="Add"
                    onPress={() => handleAddFriend(friend.id)}
                  />
                )}
              </View>
            ))
          ) : (
            <View style={styles.share}>
              <ShareCard />
            </View>
          )
        ) : (
          <View style={styles.share}>
            <ShareCard />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 22,
  },
  spacer: {
    width: 24,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  friendsList: {
    marginTop: 10,
  },
  friendItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingVertical: 10,
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  share: {
    paddingTop: 20,
  },
})

export default FindFriends
