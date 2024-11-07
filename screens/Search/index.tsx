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
import api from "@/service"

const FindFriends = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState("")
  const [addedUsers, setAddedUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState(availableFriends)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const fetchUsers = async () => {
    try {
      const response = await api.get(`/users/`)
      const users = response.data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        imageUrl: user.profile || "",
      }))
      setAllUsers(users)
      setFilteredUsers(users)
    } catch (error) {
      console.error("error fetching users", error)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = (name: string) => {
    setSearch(name)
    const filtered = allUsers
      .filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
    setFilteredUsers(filtered)
  }

  const handleAddFriend = (user: User) => {
    setAddedUsers((prev) => {
      const isAdded = prev.some((addedFriend) => addedFriend.id === user.id)
      if (isAdded)
        return prev.filter((addedFriend) => addedFriend.id !== user.id)
      return [...prev, user]
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
          filteredUsers.length > 0 &&
          filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.friendItem}
              onPress={() => handleAddFriend(user)}>
              <View style={styles.userDetails}>
                <UserAvatar imageUrl={user.imageUrl || ""} />
                <View style={{ marginLeft: 8 }}>
                  <UserInfo fullName={user.name} username={user.username} />
                </View>
              </View>
              {addedUsers.some((addedUsers) => addedUsers.id === user.id) ? (
                <CheckIcon
                  color={theme.colors.black}
                  onPress={() => handleAddFriend(user)}
                />
              ) : (
                <CustomButton
                  variant="outline"
                  title="Add"
                  onPress={() => handleAddFriend(user)}
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
