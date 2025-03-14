import ActionHeader from "@/components/cards/ActionHeader"
import PlusIcon from "@/components/vectors/PlusIcon"
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGetGroups } from "@/queries/groups"
import { Group } from "@/types"
import { useNavigation } from "@react-navigation/native"
import { CreateGroupScreenProps } from "@/screens/Groups/CreateGroup"
import ActionCard from "@/components/cards/Action"
export default function GroupsScreen() {
  const { data: groups } = useGetGroups()
  const navigation = useNavigation<CreateGroupScreenProps>()

  return (
    <SafeAreaView>
      <ActionHeader
        title="Groups"
        onPress={() => navigation.navigate("CreateGroup")}
        icon={<PlusIcon width={24} height={24} />}
      />
      <ScrollView
        style={styles.GroupContainer}
        contentContainerStyle={{ gap: 16 }}>
        {groups?.map((group: Group) => (
          <ActionCard
            key={group.id}
            title={group.name}
            id={group.id}
            description={`${group.friend_ids?.length || 0} members`}
            onPress={() => {}}
            fontFamily="writer-monos"
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  GroupContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 16,
  },
})
