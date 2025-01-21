import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Input from "@/components/ui/Input"
import UserInfo from "@/components/UserInfo"
import { CustomButton } from "@/components/ui/Button"
import { useCallback, useMemo, useState } from "react"
import UserAvatar from "@/components/ui/UserAvatar"
import CustomText from "@/components/ui/CustomText"
import { User } from "@/types"
import { theme } from "@/theme"
import CheckIcon from "@/components/vectors/CheckIcon"
import api from "@/service"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useQuery } from "@tanstack/react-query"
import { onShare } from "@/utils/share"
import ShareIcon from "@/components/vectors/ShareIcon"
import { useAuth } from "@/contexts/AuthContext"
import Header from "@/components/cards/Header"
import ActionCard from "@/components/cards/Action"
import debounce from "lodash.debounce"
import { useAddFriend, useRemoveFriend } from "@/queries/friends"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { CopiableText } from "@/components/cards/CopiableText"
import AlertDialog from "@/components/AlertDialog"

const FindFriends = () => {
  const [search, setSearch] = useState("")
  const [searchQueryText, setSearchQueryText] = useState("")
  const { user } = useAuth()
  const addFriend = useAddFriend()
  const removeFriend = useRemoveFriend()

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["users", searchQueryText],
    enabled: searchQueryText.trim().length > 0,
    queryFn: async () => {
      const response = await api.get(`/users?q=${searchQueryText}`)
      return response.data.map((user: User) => ({
        id: user.id,
        names: user.names,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl,
        isFriend: user.isFriend,
      }))
    },
    networkMode: "offlineFirst",
  })

  const createDebouncedSearch = (callback: (value: string) => void) =>
    debounce(callback, 200, { leading: true, trailing: true })

  const debouncedSetSearchQuery = useMemo(
    () =>
      createDebouncedSearch((value: string) => {
        setSearchQueryText(value)
      }),
    [],
  )

  const handleSearch = useCallback(
    (name: string) => {
      setSearch(name)
      debouncedSetSearchQuery(name)
    },
    [debouncedSetSearchQuery],
  )

  const handleAddFriend = (user: User) => {
    if (user.isFriend || addFriend.isPending) return
    addFriend.mutate(user.id)
  }
  const handleRemoveFriend = (user: User) => {
    if (!user.isFriend || removeFriend.isPending) return
    removeFriend.mutate(user.id)
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
        {search && (
          <>
            {isLoading ? (
              <FriendsSkeleton />
            ) : (
              users.map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.friendItem}
                  disabled={user.isFriend || addFriend.isPending}
                  onPress={() => handleAddFriend(user)}>
                  <View style={styles.userDetails}>
                    <UserAvatar imageUrl={user.profilePictureUrl} />
                    <View style={styles.userInfo}>
                      <UserInfo
                        fullName={user.names}
                        username={user.username}
                      />
                    </View>
                  </View>
                  {user.isFriend ? (
                    <TouchableOpacity
                      onPress={() => handleRemoveFriend(user)}
                      disabled={removeFriend.isPending}>
                      <CheckIcon color={theme.colors.black} />
                    </TouchableOpacity>
                  ) : (
                    <CustomButton
                      variant="outline"
                      title="Add"
                      onPress={() => handleAddFriend(user)}
                      disabled={user.isFriend || addFriend.isPending}
                    />
                  )}
                </TouchableOpacity>
              ))
            )}
          </>
        )}

        {search && !users.length && !isLoading && (
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
          <ActionCard
            title="Your friends are not on Wavv?"
            description="Invite them to join you"
            onPress={() => {
              AlertDialog.open({
                title: "Share this invite code with your friend",
                description: (
                  <CopiableText text={user?.verificationCode || ""} />
                ),
                variant: "confirm",
                confirmText: "Share",
                cancelText: "cancel",
                onConfirm: () =>
                  onShare(user?.username, user?.verificationCode),
                closeAutomatically: false,
              })
            }}
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
  userInfo: { marginLeft: 8, flex: 1 },
})

export default FindFriends
