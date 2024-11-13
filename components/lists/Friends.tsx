import { useState, useEffect, useCallback } from "react"
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
  const [friendsList, setFriendsList] = useState<User[]>([])
  const { signal } = useSignal()

  const fetchFriends = useCallback(async () => {
    const response = await api.get("/friends")
    const allFriends = response.data.map((friend: User) => ({
      id: friend.id,
      names: friend.names,
      username: friend.username || "",
      email: friend.email,
      profilePictureUrl: friend.profilePictureUrl || "",
      selected: signal?.friends.some(
        (signalFriend) => signalFriend.username === friend.username,
      ),
    }))
    return allFriends
  }, [signal])

  const { data: friendsListData, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  })

  useEffect(() => {
    if (friendsListData) {
      setFriendsList(friendsListData)
    }
  }, [friendsListData])

  const updateFriendsList = useCallback(
    (friendId: string) => {
      const updatedUserList = friendsList.map((friend) => {
        if (!friend.selected && friend.id === friendId) {
          const updatedFriends = [...friends, friendId]
          setFriends(updatedFriends)
          friend.selected = true
          return friend
        }
        return friend
      })
      setFriendsList(updatedUserList)
    },
    [friends, friendsList, setFriends],
  )

  return (
    <View style={styles.container}>
      <CustomText size="sm">Who can see it</CustomText>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        [...new Set(friendsList)].map((item, i) => {
          return (
            <FriendCard
              key={i}
              handleChange={() => updateFriendsList(item.id)}
              user={item}
            />
          )
        })
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
