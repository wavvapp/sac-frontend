import ActionHeader from "@/components/cards/ActionHeader"
import PlusIcon from "@/components/vectors/PlusIcon"
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGetGroups } from "@/queries/groups"
import { useNavigation } from "@react-navigation/native"
import { CreateGroupScreenProps } from "@/screens/Groups/CreateGroup"
import ActionCard from "@/components/cards/Action"
export default function GroupsScreen() {
  const { data: groups } = useGetGroups()
  const navigation = useNavigation<CreateGroupScreenProps>()

  const getMemberCountText = (friendIds?: string[]) => {
    const count = friendIds?.length || 0
    const suffix = count === 1 ? "member" : "members"
    return `${count} ${suffix}`
  }

  return (
    <SafeAreaView>
      <ActionHeader
        title="Groups"
        onPress={() => navigation.navigate("CreateGroup")}
        icon={<PlusIcon width={24} height={24} />}
      />
      <ScrollView
        style={styles.groupContainer}
        contentContainerStyle={{ gap: 16 }}>
        {groups?.map((group) => (
          <ActionCard
            key={group.id}
            title={group.name}
            id={group.id}
            description={getMemberCountText(group.friendIds)}
            // TODO: add onPress logic to navigate to group details
            onPress={() => {}}
            fontFamily="writer-monos"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 16,
  },
})
