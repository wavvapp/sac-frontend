import ActionHeader from "@/components/cards/ActionHeader"
import PlusIcon from "@/components/vectors/PlusIcon"
import { ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGetGroups } from "@/queries/groups"
import { useNavigation } from "@react-navigation/native"
import { CreateGroupScreenProps } from "@/screens/Groups/CreateGroup"
import ActionCard from "@/components/cards/Action"
import CustomText from "@/components/ui/CustomText"
import { useRef, useState } from "react"
import BottomDrawer, { BottomDrawerRef } from "@/components/BottomDrawer"
import { Group } from "@/types"
import EditIcon from "@/components/vectors/EditIcon"
import { theme } from "@/theme"
import { BottomSheetFlatList } from "@gorhom/bottom-sheet"
import UserInfo from "@/components/UserInfo"
export default function GroupsScreen() {
  const { data: groups } = useGetGroups()
  const navigation = useNavigation<CreateGroupScreenProps>()
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [_, setIsBottomSheetOpen] = useState(false)
  const bottomDrawerRef = useRef<BottomDrawerRef>(null)
  const handleOpenGroupInfo = (group: Group) => {
    setCurrentGroup(group)
    bottomDrawerRef.current?.openBottomSheet()
  }
  const getMemberCountText = (count?: number) => {
    const suffix = count === 1 ? "member" : "members"
    return `${count} ${suffix}`
  }
  return (
    <SafeAreaView style={styles.container}>
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
            description={getMemberCountText(group.friends?.length)}
            onPress={() => handleOpenGroupInfo(group)}
            fontFamily="writer-monos"
          />
        ))}
      </ScrollView>
      <BottomDrawer
        ref={bottomDrawerRef}
        setIsBottomSheetOpen={setIsBottomSheetOpen}
        snapPoints={["1%", "50%"]}
        fullyHiddenOnClose={true}>
        <View style={styles.content}>
          <View style={styles.header}>
            <CustomText
              size="lg"
              fontWeight="semibold"
              style={styles.groupName}>
              {currentGroup?.name}
            </CustomText>
            <View style={styles.EditIcon}>
              <EditIcon />
            </View>
          </View>
          <BottomSheetFlatList
            contentContainerStyle={styles.usersList}
            showsVerticalScrollIndicator={false}
            data={currentGroup?.friends}
            renderItem={({ item }) => (
              <UserInfo fullName={item.names} username={"username"} />
            )}
            ListFooterComponent={
              <>
                <View style={styles.line} />
                <ActionCard
                  title="Delete group"
                  titleStyle={styles.deleteButton}
                  // TODO: add delete group functionality as well
                  onPress={() => console.log("some")}
                />
              </>
            }
          />
        </View>
      </BottomDrawer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  groupName: {
    flex: 1,
    alignItems: "center",
  },
  EditIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 1,
  },
  usersList: {
    gap: 12,
    marginBottom: 10,
    paddingBottom: 48,
    paddingTop: 24,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: theme.colors.gray,
    marginVertical: 28,
  },
  deleteButton: {
    color: theme.colors.red,
    paddingVertical: 10,
  },
})
