import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Input from "@/components/ui/Input"
import UserInfo from "@/components/UserInfo"
import ShareCard from "@/components/Share"
import { CustomButton } from "@/components/ui/Button"
import { useEffect, useState } from "react"
import CloseIcon from "@/components/vectors/CloseIcon"
import { availableFriends } from "@/data/users"
import { useNavigation } from "@react-navigation/native"
import UserAvatar from "@/components/ui/UserAvatar"
import CustomText from "@/components/ui/CustomText"
import { User } from "@/types"
import { theme } from "@/theme"
import CheckIcon from "@/components/vectors/CheckIcon"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const FindFriends = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState("")
  const [addedFriends, setAddedFriends] = useState<User[]>([])
  const [filteredFriends, setFilteredFriends] = useState(availableFriends)
  const [allUsers, setAllUsers] = useState<User[]>([])
  useEffect(() => {
    fetchUsers()
  }, [])
  const fetchUsers = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("@Auth:accessToken")
      if (!accessToken) {
        console.log("Access token not found ")
        return
      }
      const response = await axios.get(`${process.env.API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      const users = response.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        imageUrl: user.profile,
      }))

      console.log(users, "fetched freind")
      setAllUsers(response.data)
      setFilteredFriends(response.data)
    } catch (error) {
      console.error("error fetching users", error)
    }
  }

  const handleSearch = (text: string) => {
    setSearch(text)
    const filtered = allUsers
      .filter((users) =>
        `${users.firstName} ${users.lastName}`
          .toLowerCase()
          .includes(text.toLowerCase()),
      )
      .sort((a, b) => a.firstName.localeCompare(b.firstName))
    setFilteredFriends(filtered)
  }

  const handleAddFriend = (friend: User) => {
    setAddedFriends((prev) => {
      const isAdded = prev.some((addedFriend) => addedFriend.id === friend.id)
      if (isAdded) {
        return prev.filter((addedFriend) => addedFriend.id !== friend.id)
      } else {
        return [...prev, friend]
      }
    })
  }

  const handleClose = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.spacer} />
        <CustomText size="lg" fontWeight="semibold">
          Find Friends
        </CustomText>
        <CloseIcon color={theme.colors.black} onPress={handleClose} />
      </View>
      <Input
        variant="primary"
        textSize="base"
        value={search}
        placeholder="Search by name or username"
        handleTextChange={handleSearch}
      />

      <ScrollView style={styles.friendsList}>
        {search &&
          filteredFriends.length > 0 &&
          filteredFriends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.friendItem}
              onPress={() => handleAddFriend(friend)}>
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
              {addedFriends.some(
                (addedFriend) => addedFriend.id === friend.id,
              ) ? (
                <CheckIcon
                  color={theme.colors.black}
                  onPress={() => handleAddFriend(friend)}
                />
              ) : (
                <CustomButton
                  variant="outline"
                  title="Add"
                  onPress={() => handleAddFriend(friend)}
                />
              )}
            </TouchableOpacity>
          ))}
        <View style={styles.share}>
          <ShareCard />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 70,
    backgroundColor: theme.colors.white,
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
