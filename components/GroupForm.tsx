import React, { useState, useCallback } from "react"
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { useNavigation } from "@react-navigation/native"
import { useFriends } from "@/queries/friends"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import FriendCard from "./Friend"
import { CustomButton } from "@/components/ui/Button"
import HeaderWrapper from "@/components/ui/HeaderWrapper"
import Input from "@/components/ui/Input"
import CrossMark from "@/components/vectors/CrossMark"

type GroupFormProps = {
  onSave: (groupName: string, friendIds: string[]) => void
  initialGroupName?: string
  initialFriendIds?: string[]
}

export const GroupForm = ({
  onSave,
  initialGroupName = "",
  initialFriendIds = [],
}: GroupFormProps) => {
  const [groupName, setGroupName] = useState(initialGroupName)
  const navigation = useNavigation()
  const [friendIds, setFriendIds] = useState<string[]>(initialFriendIds)
  const { data: allFriends, isLoading } = useFriends()

  const updateFriendsList = useCallback((friendId: string) => {
    setFriendIds((prevFriendIds) => {
      const newFriendIds = prevFriendIds.includes(friendId)
        ? prevFriendIds.filter((id) => id !== friendId)
        : [...prevFriendIds, friendId]
      return newFriendIds
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <HeaderWrapper style={styles.header}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeIcon}>
            <CrossMark style={{ marginLeft: -5 }} />
          </TouchableOpacity>
          <Input
            variant="ghost"
            placeholder="Group name"
            value={groupName}
            handleTextChange={(text) => setGroupName(text)}
            style={styles.input}
            textSize="lg"
          />
        </View>
        <CustomButton
          onPress={() => onSave(groupName, friendIds)}
          disabled={!groupName || !friendIds.length}
          title="Save"
        />
      </HeaderWrapper>

      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        allFriends && (
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.friendListContainer}
            data={allFriends}
            renderItem={({ item: friend }) =>
              FriendCard({
                containerStyles: styles.friend,
                selected: friendIds?.includes(friend.id),
                handleChange: () => updateFriendsList(friend.id),
                user: friend,
              })
            }
          />
        )
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  friendListContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  friend: {
    marginTop: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    flex: 1,
  },
  input: {
    minWidth: "85%",
    maxWidth: "90%",
  },
  closeIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  contentContainerStyle: {
    paddingBottom: 50,
  },
})
