import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import { View, StyleSheet } from "react-native"
import CustomText from "@/components/ui/CustomText"
import BottomDrawer from "@/components/BottomDrawer"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/navigation"
import { useSignalingFriends } from "@/queries/friends"
import { Friend } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import SearchIcon from "../vectors/SearchIcon"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Notifications from "expo-notifications"

export interface SignalingRef {
  openBottomSheet: () => void
}
type SearchProp = NativeStackNavigationProp<RootStackParamList, "Search">

const Signaling = forwardRef<SignalingRef>((_, ref) => {
  const navigation = useNavigation<SearchProp>()
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { data: availableFriends = [], refetch } =
    useSignalingFriends(isbottomSheetOpen)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const onlineFriends = useMemo(() => {
    return availableFriends.filter((friend) => friend.signal)
  }, [availableFriends])

  const offlineFriends = useMemo(() => {
    return availableFriends.filter((friend) => !friend.signal)
  }, [availableFriends])

  const refetchFriendsData = useCallback(async () => {
    await queryClient.refetchQueries({ queryKey: ["friend-signals"] })
    await queryClient.refetchQueries({ queryKey: ["friends"] })
  }, [queryClient])

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch]),
  )

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      refetch()
    })
    return () => subscription.remove()
  }, [refetch])

  const openSearch = () => {
    refetchFriendsData()
    navigation.navigate("Search")
  }

  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await refetchFriendsData()
    } catch (err) {
      console.error("Failed to refetch the friends", err)
    } finally {
      setRefreshing(false)
    }
  }, [refetchFriendsData])

  return (
    <BottomDrawer
      snapPoints={["20%", "93%"]}
      enableOverDrag
      maxDynamicContentSize={100}
      ref={ref}
      handleStyle={{
        borderWidth: 1,
        borderColor: "red",
        width: "100%",
        height: 70,
        position: "absolute",
        // height: 80,
      }}
      setIsBottomSheetOpen={setIsBottomSheetOpen}>
      <BottomSheetSectionList
        refreshing={false}
        onRefresh={handleRefresh}
        contentContainerStyle={{ backgroundColor: theme.colors.white }}
        ListHeaderComponent={
          <View style={styles.header}>
            <CustomText
              size="lg"
              fontWeight="semibold"
              style={styles.headerText}>
              Friends
            </CustomText>
            {/* <TouchableOpacity
              style={styles.SearchIcon}
              onPress={() => openSearch()}>
              <SearchIcon />
            </TouchableOpacity> */}
          </View>
        }
        sections={[
          {
            data: !onlineFriends.length ? [{} as Friend] : [],
            renderItem: () => (
              <CustomText style={styles.noUsers}>
                None of your friends wavv'd yet :(
              </CustomText>
            ),
          },
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
                isLast: index === onlineFriends.length - 1,
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
    marginTop: 32,
    backgroundColor: theme.colors.white,
  },
  headerText: {
    fontSize: 20,
    lineHeight: 28,
  },
  noUsers: {
    padding: 20,
    backgroundColor: theme.colors.white,
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
