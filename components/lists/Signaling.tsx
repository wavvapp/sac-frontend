import { forwardRef, useMemo, useState } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import BottomDrawer from "@/components/BottomDrawer"
import { CustomButton } from "@/components/ui/Button"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { useFriends, useSignalingFriends } from "@/queries/friends"
import { Friend, User } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { width } from "@/utils/dimensions"

export interface SignalingRef {
  openBottomSheet: () => void
}
type SearchProp = NativeStackNavigationProp<RootStackParamList, "Search">

const Signaling = forwardRef<SignalingRef>((_, ref) => {
  const navigation = useNavigation<SearchProp>()
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { data: allFriends } = useFriends(isbottomSheetOpen)
  const { data: availableFriends = [] } = useSignalingFriends(isbottomSheetOpen)
  const queryClient = useQueryClient()

  const offlineFriends = useMemo(() => {
    if (!allFriends) return []
    return allFriends.filter(
      (friend: Friend) =>
        !availableFriends.some(
          (availableFriend: User) => availableFriend.id === friend.id,
        ),
    )
  }, [allFriends, availableFriends])

  const openSearch = () => {
    queryClient.refetchQueries({ queryKey: ["friend-signals"] })
    queryClient.refetchQueries({ queryKey: ["friends"] })
    navigation.navigate("Search")
  }

  return (
    <BottomDrawer ref={ref} setIsBottomSheetOpen={setIsBottomSheetOpen}>
      <View style={styles.header}>
        <CustomText size="lg" fontWeight="semibold" style={styles.headerText}>
          Friends
        </CustomText>
        <CustomButton
          variant="default"
          textSize="sm"
          title="FIND"
          textStyles={{ fontWeight: 600 }}
          onPress={() => openSearch()}
        />
      </View>
      {!availableFriends.length && (
        <CustomText style={styles.noUsers}>
          None of your friends on Wavv are available today
        </CustomText>
      )}
      <BottomSheetSectionList
        sections={[
          {
            title: "available users",
            data: availableFriends,
            ItemSeparatorComponent: () => (
              <View style={styles.availableItemSeparator} />
            ),
            renderItem: ({
              item: user,
              index,
            }: {
              item: User
              index: number
            }) =>
              SignalingUser({
                user,
                online: true,
                isLast: index === availableFriends.length - 1,
                isFirst: index === 0,
              }),
          },
          {
            title: "Other users",
            data: offlineFriends,
            ItemSeparatorComponent: () => (
              <View style={styles.offlineItemSeparator} />
            ),
            renderItem: ({ item, index }) =>
              SignalingUser({
                user: item,
                online: false,
                isLast: index === offlineFriends.length - 1,
                isFirst: index === 0,
              }),
          },
        ]}
        keyExtractor={(item) => item.id}
        style={styles.sectionListContainer}
      />
    </BottomDrawer>
  )
})

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    lineHeight: 28,
  },
  noUsers: {
    paddingHorizontal: 20,
    marginBottom: 20,
    width: width * 0.6,
  },
  sectionListContainer: {
    backgroundColor: theme.colors.black_100,
  },
  availableItemSeparator: {
    height: 12,
    backgroundColor: theme.colors.white,
  },
  offlineItemSeparator: {
    height: 12,
  },
})

Signaling.displayName = "Signaling"

export default Signaling
