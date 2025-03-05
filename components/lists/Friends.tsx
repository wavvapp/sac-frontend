import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import FriendCard from "@/components/Friend"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { Friend } from "@/types"
import { useCallback, useMemo } from "react"
import { useFriends } from "@/queries/friends"

export default function FriendsList() {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const { data: allFriends, isLoading } = useFriends()
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
      <View style={styles.header}>
        <CustomTitle text="with whom" />
        <TouchableWithoutFeedback
          onPress={toggleSelectAll}
          disabled={!allFriends}>
          <View>
            <CustomTitle
              text={canSelectAll ? "SELECT ALL" : "SELECT NONE"}
              isUnderline
            />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
})
