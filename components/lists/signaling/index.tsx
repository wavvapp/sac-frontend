import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import { View, StyleSheet, AppState } from "react-native"
import CustomText from "@/components/ui/CustomText"
import BottomDrawer from "@/components/BottomDrawer"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useFocusEffect } from "@react-navigation/native"
import { useSignalingFriends } from "@/queries/friends"
import { useQueryClient } from "@tanstack/react-query"
import { onShare } from "@/utils/share"
import ActionCard from "@/components/cards/Action"
import { useAuth } from "@/contexts/AuthContext"
import SignalingHeader from "@/components/lists/signaling/signalingHeader"
import * as Notifications from "expo-notifications"

export interface SignalingRef {
  openBottomSheet: () => void
}

const Index = forwardRef<SignalingRef>((_, ref) => {
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { data: availableFriends = [], refetch } =
    useSignalingFriends(isbottomSheetOpen)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useAuth()

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
    const listener = AppState.addEventListener("change", () => {
      refetch()
    })

    return () => listener.remove()
  }, [refetch])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      refetch()
    })
    return () => subscription.remove()
  }, [refetch])

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
    <BottomDrawer ref={ref} setIsBottomSheetOpen={setIsBottomSheetOpen}>
      {!availableFriends.length && (
        <CustomText style={styles.noUsers}>
          None of your friends wavv'd yet :(
        </CustomText>
      )}
      <BottomSheetSectionList
        refreshing={refreshing}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() => SignalingHeader()}
        ListFooterComponent={() =>
          ActionCard({
            style: styles.shareActionCard,
            title: "Your friends are not here?",
            description: "Find/Invite friends on Wavv",
            onPress: () => onShare(user?.username, user?.inviteCode),
          })
        }
        onRefresh={handleRefresh}
        sections={[
          {
            title: "available users",
            data: onlineFriends,
            ItemSeparatorComponent: () => (
              <View style={styles.availableItemSeparator} />
            ),
            renderItem: ({ item: user, index }) =>
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
  shareActionCard: {
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
})

Index.displayName = "Signaling"

export default Index
