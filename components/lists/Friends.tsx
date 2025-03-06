import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import FriendCard from "@/components/Friend"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { Friend } from "@/types"
import { useCallback, useMemo } from "react"
import { useFriends } from "@/queries/friends"
import ActionCard from "../cards/Action"
import { onShare } from "@/utils/share"
import { useAuth } from "@/contexts/AuthContext"
import CustomText from "../ui/CustomText"
import CheckBox from "../ui/CheckBox"

export default function FriendsList() {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const { data: allFriends, isLoading } = useFriends()
  const { user } = useAuth()
  const { friendIds } = temporaryStatus

  const updateFriendsList = useCallback(
    (friendId: string) => {
      const newFriends = friendIds?.includes(friendId)
        ? friendIds?.filter((id) => id !== friendId)
        : [...friendIds, friendId]

      setTemporaryStatus((prev: TemporaryStatusType) => ({
        ...prev,
        friendIds: newFriends,
      }))
    },
    [friendIds, setTemporaryStatus],
  )

  const canSelectAll = useMemo(() => {
    if (!allFriends) return true
    const allSelected = allFriends.every((friend) =>
      friendIds.includes(friend.id),
    )
    return !allSelected
  }, [allFriends, friendIds])

  const toggleSelectAll = useCallback(() => {
    if (!allFriends) return

    const allFriendsIds = allFriends?.map((friend) => friend.id)

    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      friendIds: canSelectAll ? allFriendsIds : [],
    }))
  }, [allFriends, canSelectAll, setTemporaryStatus])

  return (
    <View style={styles.container}>
      <CustomTitle text="with whom" style={styles.title} />
      <View style={styles.selectContainer}>
        <View>
          <CustomText fontWeight="semibold">Select All</CustomText>
          <CustomText>Wavv all your friends</CustomText>
        </View>
        <TouchableWithoutFeedback
          onPress={toggleSelectAll}
          disabled={!allFriends}>
          <View>
            <CheckBox isChecked={!canSelectAll} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        allFriends?.map((friend: Friend) => (
          <FriendCard
            selected={friendIds?.includes(friend.id)}
            key={friend.id}
            handleChange={() => updateFriendsList(friend.id)}
            user={friend}
          />
        ))
      )}
      <ActionCard
        title="Your friends are not here?"
        description="Find/Invite friends on Wavv"
        onPress={() => onShare(user?.username, user?.inviteCode)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    marginBottom: 24,
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
})
