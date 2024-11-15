import { useCallback } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import { User } from "@/types"
import { useFriends } from "@/hooks/useFriends"
import { useStatus } from "@/contexts/StatusContext"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { useQuery } from "@tanstack/react-query"

export default function FriendsList() {
  const { friendIds, setFriendIds } = useStatus()
  const { fetchAllFriends } = useFriends()

  const { data: friendsListData, isLoading } = useQuery<User[]>({
    queryKey: ["friends"],
    queryFn: fetchAllFriends,
  })

  const updateFriendsList = useCallback(
    (friendId: string) => {
      const newFriends = friendIds?.includes(friendId)
        ? friendIds.filter((id) => id !== friendId)
        : [...friendIds, friendId]

      setFriendIds(newFriends)
    },
    [friendIds, setFriendIds],
  )
  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        friendsListData?.map((friend) => (
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
