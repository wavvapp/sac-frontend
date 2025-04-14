import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import { View, StyleSheet, AppState } from "react-native"
import BottomDrawer, { BottomDrawerRef } from "@/components/BottomDrawer"
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

const Index = forwardRef<BottomDrawerRef>((_, ref) => {
  const [isbottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)
  const { data: availableFriends = [], refetch } =
    useSignalingFriends(isbottomSheetOpen)
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useAuth()

  const friendsWithSignalOn = useMemo(() => {
    return availableFriends.filter((friend) => friend.signal)
  }, [availableFriends])

  const friendsWithSignalOff = useMemo(() => {
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
    <BottomDrawer
      ref={ref}
      style={{ backgroundColor: theme.colors.white, borderRadius: 20 }}
      setIsBottomSheetOpen={setIsBottomSheetOpen}>
      <BottomSheetSectionList
        refreshing={refreshing}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={() =>
          SignalingHeader({ availableFriends: friendsWithSignalOn })
        }
        ListFooterComponent={() => (
          <View
            style={{
              paddingBottom: 20,
            }}>
            {ActionCard({
              style: styles.shareActionCard,
              title: "Your friends are not here?",
              description: "Find/Invite friends on Wavv",
              onPress: () => onShare(user?.username, user?.inviteCode),
            })}
          </View>
        )}
        onRefresh={handleRefresh}
        sections={[
          {
            title: "available users",
            data: friendsWithSignalOn,
            ItemSeparatorComponent: () => (
              <View style={styles.availableItemSeparator} />
            ),
            renderItem: ({ item: user, index }) =>
              SignalingUser({
                user,
                online: true,
                isLast: index === friendsWithSignalOn.length - 1,
                isFirst: index === 0,
                hasNotificationEnabled: !!user?.hasNotificationEnabled,
              }),
          },
          {
            title: "Other users",
            data: friendsWithSignalOff,
            renderItem: ({ item: user, index }) =>
              SignalingUser({
                user,
                online: false,
                isLast: index === friendsWithSignalOff.length - 1,
                isFirst: index === 0,
                hasNotificationEnabled: !!user?.hasNotificationEnabled,
                style: {
                  paddingTop: 12,
                },
              }),
          },
        ]}
        keyExtractor={(item) => item.id}
      />
    </BottomDrawer>
  )
})

const styles = StyleSheet.create({
  availableItemSeparator: {
    height: 12,
    backgroundColor: theme.colors.white,
  },
  shareActionCard: {
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20,
    flexGrow: 1,
    backgroundColor: theme.colors.black_100,
  },
})

Index.displayName = "Signaling"

export default Index
