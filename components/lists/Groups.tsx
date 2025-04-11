import { FriendsSkeleton } from "../cards/FriendsSkeleton"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useGetGroups } from "@/queries/groups"
import CheckBox from "@/components/ui/CheckBox"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"
import ActionCard from "../cards/Action"
import { useNavigation } from "@react-navigation/native"
import { CreateGroupScreenProps } from "@/screens/Groups/CreateGroup"
import { TemporaryStatusType, useStatus } from "@/contexts/StatusContext"
import { Group } from "@/types"

export default function GroupsList() {
  const { temporaryStatus, setTemporaryStatus } = useStatus()
  const { data: groups, isLoading } = useGetGroups()
  const navigation = useNavigation<CreateGroupScreenProps>()

  const findGroup = (groups: Group[], group: Group) =>
    groups?.find((group_) => group_.id === group.id)

  const toggleSelectedGroup = (group: Group) => {
    setTemporaryStatus((prev: TemporaryStatusType) => {
      const tempGroup = findGroup(prev?.groups, group)
      const newGroups = !tempGroup || group.id !== tempGroup.id ? [group] : []
      const newFriendIds =
        !tempGroup || group.id !== tempGroup.id
          ? group.friends.map((friend) => friend.id)
          : []
      return {
        ...prev,
        friendIds: newFriendIds,
        groups: newGroups,
      }
    })
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        <>
          {groups?.map((group: Group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.groupsContainer}
              onPress={() => toggleSelectedGroup(group)}>
              <View style={styles.groupItem}>
                <CustomText fontWeight="semibold">{group.name}</CustomText>
                <CustomText fontFamily="writer-monov" style={styles.details}>
                  {`${group.friends.length} members`}
                </CustomText>
              </View>

              <CheckBox
                isChecked={!!findGroup(temporaryStatus.groups, group)}
              />
            </TouchableOpacity>
          ))}

          <ActionCard
            title="Create a group"
            description={
              groups && groups?.length > 0
                ? "Add more groups to organize your friends!"
                : "You don't have any groups yet. Create one!"
            }
            onPress={() => navigation.navigate("CreateGroup")}
          />
        </>
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
