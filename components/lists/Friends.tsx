import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { User } from "@/types"
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

  const sortedFriends = useMemo(() => {
    if (!allFriends) return []
    const selectedFriends = allFriends.filter((friend) =>
      friendIds?.includes(friend.id),
    )
    const unselectedFriends = allFriends.filter(
      (friend) => !friendIds?.includes(friend.id),
    )
    const sortFriendsByName = (a: User, b: User) =>
      a.names.localeCompare(b.names)
    return [
      ...selectedFriends.sort(sortFriendsByName),
      ...unselectedFriends.sort(sortFriendsByName),
    ]
  }, [allFriends])
  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        sortedFriends?.map((friend: User) => (
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
