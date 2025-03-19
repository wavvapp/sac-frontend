import { Group } from "@/types"
import { FriendsSkeleton } from "../cards/FriendsSkeleton"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useGetGroups } from "@/queries/groups"
import { useCallback, useMemo } from "react"
import CheckBox from "@/components/ui/CheckBox"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import ActionCard from "../cards/Action"
import { useNavigation } from "@react-navigation/native"
import { CreateGroupScreenProps } from "@/screens/Groups/CreateGroup"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"

export default function GroupsList() {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const { data: groups, isLoading } = useGetGroups()
  const navigation = useNavigation<CreateGroupScreenProps>()

  const { friendIds } = temporaryStatus

  const selectedGroups = useMemo(() => {
    if (!groups) return []
    return groups
      .filter((group) =>
        group.friends.every((friend) => friendIds.includes(friend.id)),
      )
      .map((group) => group.id)
  }, [groups, friendIds])

  const updateSelectedGroupsList = useCallback(
    (group: Group) => {
      const newFriendIds = group.friends.map((friend) => friend.id)

      setTemporaryStatus((prev: TemporaryStatusType) => {
        const updatedFriendIds = selectedGroups.includes(group.id)
          ? prev.friendIds.filter((id) => !newFriendIds.includes(id))
          : Array.from(new Set([...prev.friendIds, ...newFriendIds]))

        return { ...prev, friendIds: updatedFriendIds }
      })
    },
    [selectedGroups, setTemporaryStatus],
  )

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FriendsSkeleton />
      ) : !!groups?.length ? (
        groups?.map((group: Group) => (
          <TouchableOpacity
            key={group.id}
            style={styles.groupsContainer}
            onPress={() => updateSelectedGroupsList(group)}>
            <View style={styles.groupItem}>
              <CustomText fontWeight="semibold">{group.name}</CustomText>
              <CustomText fontFamily="writer-monov" style={styles.details}>
                {`${group.friends.length} members`}
              </CustomText>
            </View>

            <CheckBox isChecked={selectedGroups.includes(group.id)} />
          </TouchableOpacity>
        ))
      ) : (
        <ActionCard
          title="Create a group"
          description="You don't have any groups yet. Create one!"
          onPress={() => navigation.navigate("CreateGroup")}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: "column", gap: 12 },
  groupsContainer: { flexDirection: "row", gap: 8, alignItems: "center" },
  groupItem: { flexDirection: "column", flex: 1 },
  details: { color: theme.colors.black, opacity: 0.5 },
})
