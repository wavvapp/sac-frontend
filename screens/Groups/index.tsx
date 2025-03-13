import ActionHeader from "@/components/cards/ActionHeader"
import GroupOverview from "@/components/cards/GroupOverview"
import PlusIcon from "@/components/vectors/PlusIcon"
import { ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGetGroups } from "@/queries/groups"
import { Group } from "@/types"
export default function GroupsScreen() {
  const { data: groups } = useGetGroups()

  return (
    <SafeAreaView>
      <ActionHeader
        title="Groups"
        onPress={() => {}}
        icon={<PlusIcon width={24} height={24} />}
      />
      <ScrollView
        style={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 14, gap: 16 }}
        contentContainerStyle={{ gap: 16 }}>
        {groups?.map((group: Group) => (
          <GroupOverview
            key={group.id}
            name={group.name}
            id={group.id}
            members={group.friend_ids.length}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
