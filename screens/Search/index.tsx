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
import { useState } from "react"
import CloseIcon from "@/components/vectors/CloseIcon"
import { useNavigation } from "@react-navigation/native"
import UserAvatar from "@/components/ui/UserAvatar"
import CustomText from "@/components/ui/CustomText"
import { User } from "@/types"
import { theme } from "@/theme"
import CheckIcon from "@/components/vectors/CheckIcon"
import api from "@/service"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const FindFriends = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState("")
  const queryClient = useQueryClient()

  const { data: users = [] } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users`)
      return response.data.map((user: User) => ({
        id: user.id,
        names: user.names,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl,
        isFriend: user.isFriend,
      }))
    },
  })

  const addFriendMutation = useMutation({
    mutationFn: (friendId: string) => api.post("/friends", { friendId }),
    onMutate: async (friendId) => {
      await queryClient.cancelQueries({ queryKey: ["users"] })
      const previousUsers = queryClient.getQueryData(["users"])
      queryClient.setQueryData(["users"], (oldUsers: User[]) =>
        oldUsers.map((user) =>
          user.id === friendId ? { ...user, isFriend: true } : user,
        ),
      )
      return { previousUsers }
    },
    onError: (err, friendId, context) => {
      queryClient.setQueryData(["users"], context?.previousUsers)
      console.warn("Error adding friend:", err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const filteredUsers = users
    .filter((user) => user.names.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.names.localeCompare(b.names))

  const handleSearch = (name: string) => {
    setSearch(name)
  }

  const handleAddFriend = (user: User) => {
    if (user.isFriend || addFriendMutation.isPending) return
    addFriendMutation.mutate(user.id)
  }

  const handleClose = () => navigation.goBack()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.spacer} />
        <CustomText size="lg" fontWeight="semibold">
          Find Friends
        </CustomText>
        <TouchableOpacity onPress={handleClose}>
          <CloseIcon color={theme.colors.black} />
        </TouchableOpacity>
      </View>
      <Input
        variant="primary"
        textSize="base"
        value={search}
        placeholder="Search by name or username"
        handleTextChange={handleSearch}
        containerStyle={styles.input}
      />

      <ScrollView style={styles.friendsList}>
        {search &&
          filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.friendItem}
              disabled={user.isFriend || addFriendMutation.isPending}
              onPress={() => handleAddFriend(user)}>
              <View style={styles.userDetails}>
                <UserAvatar imageUrl={user.profilePictureUrl} />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <UserInfo fullName={user.names} username={user.username} />
                </View>
              </View>
              {addFriendMutation.isPending &&
              addFriendMutation.variables === user.id ? (
                <ActivityIndicator
                  color={theme.colors.black}
                  size="small"
                  style={styles.loaderIcon}
                />
              ) : user.isFriend ? (
                <CheckIcon color={theme.colors.black} />
              ) : (
                <CustomButton
                  variant="outline"
                  title="Add"
                  onPress={() => handleAddFriend(user)}
                  disabled={user.isFriend || addFriendMutation.isPending}
                />
              )}
            </TouchableOpacity>
          ))}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 22,
    paddingHorizontal: 20,
  },
  input: {
    marginHorizontal: 20,
  },
  spacer: {
    width: 24,
  },
  friendsList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  friendItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  userDetails: {
    flexDirection: "row",
    flex: 1,
  },
  share: {
    paddingVertical: 20,
  },
  notFoundContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  notFoundText: { color: theme.colors.black_500 },
  loaderIcon: { paddingRight: 4 },
})

export default FindFriends
