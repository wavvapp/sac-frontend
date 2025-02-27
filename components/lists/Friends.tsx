import { View, StyleSheet } from "react-native"
import { CustomTitle } from "@/components/ui/CustomTitle"
import FriendCard from "@/components/Friend"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { Friend } from "@/types"
import { useCallback } from "react"
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

  return (
    <View style={styles.container}>
      <CustomTitle text="with whom" />
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
})
