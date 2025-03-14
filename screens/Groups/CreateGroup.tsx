import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import FriendCard from "@/components/Friend"
import { CustomButton } from "@/components/ui/Button"
import HeaderWrapper from "@/components/ui/HeaderWrapper"
import Input from "@/components/ui/Input"
import CrossMark from "@/components/vectors/CrossMark"
import { useFriends } from "@/queries/friends"
import { useCreateGroup } from "@/queries/groups"
import { Friend } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
export type CreateGroupScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "CreateGroup"
>

export default function CreateGroup() {
  const [groupName, setGroupName] = useState("")
  const { data: allFriends, isLoading } = useFriends()
  const [friendIds, setFriendIds] = useState<string[]>([])
  const navigation = useNavigation<CreateGroupScreenProps>()
  const { mutate } = useCreateGroup()

  const updateFriendsList = useCallback(
    (friendId: string) => {
      const newFriends = friendIds?.includes(friendId)
        ? friendIds?.filter((id) => id !== friendId)
        : [...friendIds, friendId]
      setFriendIds(newFriends)
    },
    [friendIds],
  )

  const onSaveGroup = () => {
    mutate({ friendIds, name: groupName })
    navigation.goBack()
  }

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
          onPress={onSaveGroup}
          disabled={!groupName || friendIds.length <= 0}
          title="Save"
        />
      </HeaderWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        style={styles.friendListContainer}>
        {isLoading ? (
          <FriendsSkeleton />
        ) : (
          allFriends?.map((friend: Friend) => (
            <FriendCard
              containerStyles={styles.friend}
              selected={friendIds?.includes(friend.id)}
              key={friend.id}
              handleChange={() => updateFriendsList(friend.id)}
              user={friend}
            />
          ))
        )}
      </ScrollView>
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
    paddingTop: 20,
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
})
