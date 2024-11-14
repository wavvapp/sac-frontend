import { useCallback, useState } from "react"
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
  const { signal } = useSignal()
  const [selectedFriends, setSelectedFriends] = useState<string[]>(friends)

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

  const { data: friendsListData, isLoading } = useQuery({
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

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        friendsListData?.map((item: User) => (
          <FriendCard
            key={item.id}
            handleChange={() => updateFriendsList(item.id)}
            user={{ ...item, selected: selectedFriends.includes(item.id) }}
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
