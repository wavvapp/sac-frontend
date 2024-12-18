import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native"
import Input from "@/components/ui/Input"
import UserInfo from "@/components/UserInfo"
import { CustomButton } from "@/components/ui/Button"
import { useState } from "react"
import UserAvatar from "@/components/ui/UserAvatar"
import CustomText from "@/components/ui/CustomText"
import { User } from "@/types"
import { theme } from "@/theme"
import CheckIcon from "@/components/vectors/CheckIcon"
import api from "@/service"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { onShare } from "@/utils/share"
import ShareIcon from "@/components/vectors/ShareIcon"
import ConfirmAction from "@/components/ConfirmAction"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/cards/Header"

const FindFriends = () => {
  const [search, setSearch] = useState("")
  const { user } = useAuth()
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

  const addFriend = useMutation({
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
      console.error("Error adding friend:", err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["friends"] })
    },
  })

  const filteredUsers = users
    .filter((user) => user.names.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.names.localeCompare(b.names))

  const handleSearch = (name: string) => {
    setSearch(name)
  }

  const handleAddFriend = (user: User) => {
    if (user.isFriend || addFriend.isPending) return
    addFriend.mutate(user.id)
  }



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header title="Find Friends" />
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
              disabled={user.isFriend || addFriend.isPending}
              onPress={() => handleAddFriend(user)}>
              <View style={styles.userDetails}>
                <UserAvatar imageUrl={user.profilePictureUrl} />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <UserInfo fullName={user.names} username={user.username} />
                </View>
              </View>
              {addFriend.isPending && addFriend.variables === user.id ? (
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
                  disabled={user.isFriend || addFriend.isPending}
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
          <ConfirmAction
            title=" Your friends are not on Wavv?"
            description="Invite them to join you"
            onPress={() => onShare(user?.username)}
            icon={<ShareIcon />}
          />
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
  input: {
    marginHorizontal: 20,
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
