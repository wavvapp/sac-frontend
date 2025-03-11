import { forwardRef, useMemo, useState } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import BottomDrawer from "@/components/BottomDrawer"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { useSignalingFriends } from "@/queries/friends"
import { Friend } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import SearchIcon from "../vectors/SearchIcon"
import { TouchableOpacity } from "react-native-gesture-handler"

export interface SignalingRef {
  openBottomSheet: () => void
}
type SearchProp = NativeStackNavigationProp<RootStackParamList, "Search">

const Signaling = forwardRef<SignalingRef>((_, ref) => {
  const navigation = useNavigation<SearchProp>()
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { data: availableFriends = [] } = useSignalingFriends(isbottomSheetOpen)
  const queryClient = useQueryClient()

  const onlineFriends = useMemo(() => {
    return availableFriends.filter((friend) => friend.signal)
  }, [availableFriends])

  const offlineFriends = useMemo(() => {
    return availableFriends.filter((friend) => !friend.signal)
  }, [availableFriends])

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
        <TouchableOpacity
          style={styles.SearchIcon}
          onPress={() => openSearch()}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
      {!availableFriends.length && (
        <CustomText style={styles.noUsers}>
          None of your friends wavv'd yet :(
        </CustomText>
      )}
      <BottomSheetSectionList
        sections={[
          {
            title: "available users",
            data: onlineFriends,
            ItemSeparatorComponent: () => (
              <View style={styles.availableItemSeparator} />
            ),
            renderItem: ({
              item: user,
              index,
            }: {
              item: Friend
              index: number
            }) =>
              SignalingUser({
                user,
                online: true,
                isLast: index === availableFriends.length - 1,
                isFirst: index === 0,
                hasNotificationEnabled: !!user?.hasNotificationEnabled,
              }),
          },
          {
            title: "Other users",
            data: offlineFriends,
            ItemSeparatorComponent: () => (
              <View style={styles.offlineItemSeparator} />
            ),
            renderItem: ({ item: user, index }) =>
              SignalingUser({
                user,
                online: false,
                isLast: index === offlineFriends.length - 1,
                isFirst: index === 0,
                hasNotificationEnabled: !!user?.hasNotificationEnabled,
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
  SearchIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
})

Signaling.displayName = "Signaling"

export default Signaling
