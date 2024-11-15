import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import Input from "@/components/ui/Input"
import UserInfo from "@/components/UserInfo"
import ShareCard from "@/components/Share"
import { CustomButton } from "@/components/ui/Button"
import { useCallback, useEffect, useState } from "react"
import CloseIcon from "@/components/vectors/CloseIcon"
import { useNavigation } from "@react-navigation/native"
import UserAvatar from "@/components/ui/UserAvatar"
import CustomText from "@/components/ui/CustomText"
import { User } from "@/types"
import { theme } from "@/theme"
import CheckIcon from "@/components/vectors/CheckIcon"
import api from "@/service"
import { useFriends } from "@/hooks/useFriends"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"

const FindFriends = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [isLoadingFriend, setIsLoadingFriend] = useState<
    Record<string, boolean>
  >({})
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isAnyFriendLoading, setisAnyFriendLoading] = useState(false)
  const { fetchAllFriends } = useFriends()
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/users`)
      const users = response.data.map((user: User) => ({
        id: user.id,
        names: user.names,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl,
        isFriend: user.isFriend,
      }))
      setAllUsers(users)
      setFilteredUsers(users)
    } catch (error) {
      console.error("error fetching users", error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = (name: string) => {
    setSearch(name)
    const filtered = allUsers
      .filter((user) => user.names.toLowerCase().includes(name.toLowerCase()))
      .sort((a, b) => a.names.localeCompare(b.names))
    setFilteredUsers(filtered)
  }

  const handleAddFriend = async (user: User) => {
    if (isLoadingFriend[user.id] || user.isFriend || isAnyFriendLoading) return
    try {
      setisAnyFriendLoading(true)
      setIsLoadingFriend((prev) => ({ ...prev, [user.id]: true }))
      await api.post("/friends", { friendId: user.id })
      setAllUsers((prevUsers) =>
        prevUsers.map((currentUser) =>
          currentUser.id === user.id
            ? { ...currentUser, isFriend: true }
            : currentUser,
        ),
      )
      setFilteredUsers((prevUsers) =>
        prevUsers.map((currentUser) =>
          currentUser.id === user.id
            ? { ...currentUser, isFriend: true }
            : currentUser,
        ),
      )
      await fetchAllFriends()
    } catch (error: any) {
      console.warn("Error adding friend:", error.response.data.message)
    } finally {
      setisAnyFriendLoading(false)
      setIsLoadingFriend((prev) => ({ ...prev, [user.id]: false }))
    }
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
        {isLoading ? (
          <FriendsSkeleton />
        ) : (
          search &&
          filteredUsers.length > 0 &&
          filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.friendItem}
              disabled={isLoadingFriend[user.id]}
              onPress={() => handleAddFriend(user)}>
              <View style={styles.userDetails}>
                <UserAvatar imageUrl={user.profilePictureUrl} />
                <View style={{ marginLeft: 8 }}>
                  <UserInfo fullName={user.names} username={user.username} />
                </View>
              </View>
              {isLoadingFriend[user.id] ? (
                <CustomButton variant="outline">
                  <ActivityIndicator color={theme.colors.black_500} />
                </CustomButton>
              ) : user.isFriend ? (
                <CheckIcon color={theme.colors.black} />
              ) : (
                <CustomButton
                  variant="outline"
                  title="Add"
                  onPress={() => handleAddFriend(user)}
                />
              )}
            </TouchableOpacity>
          ))
        )}
        {search && !filteredUsers.length && (
          <View style={styles.notFoundContainer}>
            <CustomText
              size="sm"
              fontWeight="semibold"
              style={styles.notFoundText}>
              User not found
            </CustomText>
          </View>
        )}

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
  notFoundContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  notFoundText: { color: theme.colors.black_500 },
})

export default FindFriends
