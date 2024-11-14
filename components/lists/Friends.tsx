import { useState, useCallback, useMemo } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import FriendCard from "@/components/Friend"
import api from "@/service"
import { User } from "@/types"
import { useStatus } from "@/contexts/StatusContext"
import { useSignal } from "@/hooks/useSignal"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import { useQuery } from "@tanstack/react-query"

export default function FriendsList() {
  const { friends, setFriends } = useStatus()
  const [selectedFriends, setSelectedFriends] = useState<string[]>(friends)
  const { signal } = useSignal()

  const fetchFriends = useCallback(async () => {
    const response = await api.get("/friends")
    return response.data.map((friend: User) => ({
      id: friend.id,
      names: friend.names,
      username: friend.username || "",
      email: friend.email,
      profilePictureUrl: friend.profilePictureUrl || "",
      selected: signal?.friends.some(
        (signalFriend) => signalFriend.username === friend.username,
      ),
    }))
  }, [signal])

  const { data: friendsListData, isLoading } = useQuery<User[]>({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  })

  const updateFriendsList = useCallback(
    (friendId: string) => {
      setSelectedFriends((prevSelected) => {
        const isSelected = prevSelected.includes(friendId)
        const updatedSelected = isSelected
          ? prevSelected.filter((id) => id !== friendId)
          : [...prevSelected, friendId]

        setFriends(updatedSelected)
        return updatedSelected
      })
    },
    [setFriends],
  )

  const friendCardsData = useMemo(() => {
    return (
      friendsListData?.map((friend) => ({
        ...friend,
        selected: selectedFriends.includes(friend.id),
      })) || []
    )
  }, [friendsListData, selectedFriends])

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        friendCardsData.map((friend) => (
          <FriendCard
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
