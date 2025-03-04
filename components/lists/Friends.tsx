import { View, StyleSheet } from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import FriendCard from "@/components/Friend"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { Friend } from "@/types"
import { useCallback, useState } from "react"
import { useFriends } from "@/queries/friends"
import { CustomButton } from "../ui/Button"

export default function FriendsList() {
  const [canSelectAll, setCanSelectAll] = useState<boolean>(true)
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

  const ToggleSelectAll = () => {
    if (!allFriends) return

    const allFriendsIds = allFriends?.map((friend) => friend.id)

    setTemporaryStatus((prev: TemporaryStatusType) => ({
      ...prev,
      friendIds: canSelectAll ? [] : allFriendsIds,
    }))

    setCanSelectAll(!canSelectAll)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomTitle text="with whom" />
        <CustomButton
          onPress={ToggleSelectAll}
          disabled={!allFriends}
          variant="ghost"
          containerStyles={styles.selectButton}>
          <CustomTitle
            text={canSelectAll ? "SELECT ALL" : "SELECT NONE"}
            isUnderline
          />
        </CustomButton>
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
  selectButton: {
    paddingVertical: 0,
  },
})
