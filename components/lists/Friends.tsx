import { useState, useEffect, useCallback, useMemo } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { User } from "@/types"
import { useSignal } from "@/hooks/useSignal"
import { useFriends } from "@/hooks/useFriends"
import { useStatus } from "@/contexts/StatusContext"

export default function FriendsList() {
  const { friends, setFriends } = useStatus()
  const { friends: allFriends } = useFriends()
  const { signal } = useSignal()
  const [friendsList, setFriendsList] = useState<User[]>([])

  const fetchFriends = useCallback(async () => {
    try {
      const friendsList = allFriends.map((friend: User) => ({
        ...friend,
        selected: signal?.friends.some(
          (signalFriend) => signalFriend.username === friend.username,
        ),
      }))
      setFriendsList(friendsList)
    } catch (error) {
      console.error("Error fetching friends", error)
    }
  }, [allFriends, signal?.friends])

  useEffect(() => {
    fetchFriends()
  }, [fetchFriends])

  const handleFriendSelection = useCallback(
    (friendId: string) => {
      const newFriends = friends.includes(friendId)
        ? friends.filter((id) => id !== friendId)
        : [...friends, friendId]

      setFriends(newFriends)
    },
    [friends, setFriends],
  )

  const friendCardsData = useMemo(() => {
    return friendsList.map((friend) => ({
      ...friend,
      selected: friends.includes(friend.id),
    }))
  }, [friendsList, friends])

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {friendCardsData.map((friend) => (
        <FriendCard
          key={friend.id}
          handleChange={() => handleFriendSelection(friend.id)}
          user={friend}
        />
      ))}
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
