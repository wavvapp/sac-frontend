import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { useFriends } from "@/hooks/useFriends"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { User } from "@/types"
import { useCallback } from "react"

export default function FriendsList() {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const { allFriends, isLoading } = useFriends()
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
      <CustomText size="sm">Who can see it</CustomText>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        allFriends?.map((friend: User) => (
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
