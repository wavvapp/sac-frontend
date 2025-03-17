import { Group } from "@/types"
import { FriendsSkeleton } from "../cards/FriendsSkeleton"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useGetGroups } from "@/queries/groups"
import { useCallback, useState } from "react"
import CheckBox from "@/components/ui/CheckBox"
import CustomText from "@/components/ui/CustomText"
import { theme } from "@/theme"

export default function GroupsList() {
  const { data: groups, isLoading } = useGetGroups()
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const updateGroupsList = useCallback(
    (friendId: string) => {
      const newGroups = selectedGroups?.includes(friendId)
        ? selectedGroups?.filter((id) => id !== friendId)
        : [...selectedGroups, friendId]

      setSelectedGroups(newGroups)
    },
    [selectedGroups],
  )
  return (
    <View style={styles.container}>
      {isLoading ? (
        <FriendsSkeleton />
      ) : (
        groups?.map((group: Group) => (
          <TouchableOpacity
            style={styles.groupsContainer}
            onPress={() => updateGroupsList(group.id)}>
            <View style={styles.groupItem}>
              <CustomText fontWeight="semibold">{group.name}</CustomText>
              <CustomText fontFamily="writer-monov" style={styles.details}>
                {`${groups.length} members`}
              </CustomText>
            </View>

            <CheckBox isChecked={selectedGroups?.includes(group.id)} />
          </TouchableOpacity>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 12,
  },
  groupsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  groupItem: {
    flexDirection: "column",
    flex: 1,
  },
  details: {
    color: theme.colors.black,
    opacity: 0.5,
  },
})
