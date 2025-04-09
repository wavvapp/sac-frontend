import { forwardRef, useCallback, useEffect, useMemo, useState } from "react"
import {
  View,
  StyleSheet,
  AppState,
  TouchableOpacity,
  Alert,
} from "react-native"
import BottomDrawer from "@/components/BottomDrawer"
import { BottomSheetSectionList } from "@gorhom/bottom-sheet"
import { theme } from "@/theme"
import SignalingUser from "@/components/SignalingUser"
import { useFocusEffect } from "@react-navigation/native"
import { useReplyToSignal, useSignalingFriends } from "@/queries/friends"
import { useQueryClient } from "@tanstack/react-query"
import { onShare } from "@/utils/share"
import ActionCard from "@/components/cards/Action"
import { useAuth } from "@/contexts/AuthContext"
import SignalingHeader from "@/components/lists/signaling/signalingHeader"
import * as Notifications from "expo-notifications"
import UserStatusDetailsBottomSheet from "@/components/StatusDetails/UserStatusDetailsBottomSheet"
import CustomText from "@/components/ui/CustomText"
import { Friend } from "@/types"
import Badge from "@/components/ui/Badge"
import { CustomTitle } from "@/components/ui/CustomTitle"

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
  const [signalingFriend, setSignalingFriend] = useState<Friend | null>(null)

  const { mutateAsync: replyToSignal } = useReplyToSignal({
    onSuccess: () => {
      refetch()
    },
    onError: () => {
      Alert.alert("Error", "Failed to reply to the signal, try again!")
    },
  })
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

  const [
    isStatusDetailsBottomSheetOpened,
    setIsStatusDetailsBottomSheetOpened,
  ] = useState(false)

  const onOpenDetailsModal = (signalingFriend: Friend) => {
    setSignalingFriend(signalingFriend)
    setIsStatusDetailsBottomSheetOpened((prev) => !prev)
  }

  const onReplyToSignal = async (
    signalingFriend: Friend,
    hasAccepted: boolean,
  ) => {
    setSignalingFriend((prev) =>
      prev ? { ...prev, hasAccepted, hasReplied: true } : null,
    )
    if (signalingFriend.signal?.id) {
      await replyToSignal({ signalId: signalingFriend.signal?.id, hasAccepted })
    }
    setIsStatusDetailsBottomSheetOpened(false)
  }

  return (
    <>
      <BottomDrawer ref={ref} setIsBottomSheetOpen={setIsBottomSheetOpen}>
        <BottomSheetSectionList
          refreshing={refreshing}
          contentContainerStyle={styles.contentContainerStyle}
          ListHeaderComponent={() =>
            SignalingHeader({ availableFriends: friendsWithSignalOn })
          }
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
                  onReply: onOpenDetailsModal,
                  hasAccepted: user.signal?.accepted,
                  hasReplied: user.signal?.replied,
                }),
            },
            {
              title: "Other users",
              data: friendsWithSignalOff,
              ItemSeparatorComponent: () => (
                <View style={styles.offlineItemSeparator} />
              ),
              renderItem: ({ item: user, index }) =>
                SignalingUser({
                  user,
                  online: false,
                  isLast: index === friendsWithSignalOff.length - 1,
                  isFirst: index === 0,
                  hasNotificationEnabled: !!user?.hasNotificationEnabled,
                  onReply: onOpenDetailsModal,
                }),
            },
          ]}
          keyExtractor={(item) => item.id}
          style={styles.sectionListContainer}
        />
      </BottomDrawer>
      {isStatusDetailsBottomSheetOpened && signalingFriend && (
        <UserStatusDetailsBottomSheet
          toggleStatusDetailsModal={() =>
            setIsStatusDetailsBottomSheetOpened((prev) => !prev)
          }>
          <View>
            <View style={styles.userDetailsContainer}>
              <CustomText size="lg" fontWeight="bold">
                {signalingFriend?.names}
              </CustomText>
              <CustomText
                size="lg"
                fontFamily="writer-monos"
                style={{ color: theme.colors.black, opacity: 0.5 }}>
                @{signalingFriend?.username}
              </CustomText>
            </View>
            <View style={styles.signalContainer}>
              <CustomText size="lg" fontWeight="bold">
                {signalingFriend.signal?.status_message}
              </CustomText>
              <Badge
                name={signalingFriend.signal?.when || ""}
                variant="outline"
              />
            </View>
            <View style={styles.replyButtonsContainer}>
              <TouchableOpacity
                onPress={() => onReplyToSignal(signalingFriend, true)}
                style={
                  signalingFriend.signal?.replied &&
                  signalingFriend.signal?.accepted
                    ? styles.replyButtonFilled
                    : styles.replyButton
                }>
                <CustomTitle
                  style={[
                    styles.replyButtonTitle,
                    signalingFriend.signal?.replied &&
                    signalingFriend.signal?.accepted
                      ? { color: theme.colors.white, opacity: 1 }
                      : { color: theme.colors.black },
                  ]}
                  text="I'm in"
                />
              </TouchableOpacity>
              {!signalingFriend.signal?.replied && (
                <View style={styles.separator} />
              )}
              <TouchableOpacity
                style={
                  signalingFriend.signal?.replied &&
                  !signalingFriend.signal?.accepted
                    ? styles.replyButtonFilled
                    : styles.replyButton
                }>
                <CustomTitle
                  onPress={() => onReplyToSignal(signalingFriend, false)}
                  style={[
                    styles.replyButtonTitle,
                    signalingFriend.signal?.replied &&
                    !signalingFriend.signal?.accepted
                      ? { color: theme.colors.white, opacity: 1 }
                      : { color: theme.colors.black },
                  ]}
                  text="I'm out"
                />
              </TouchableOpacity>
            </View>
          </View>
        </UserStatusDetailsBottomSheet>
      )}
    </>
  )
})

const styles = StyleSheet.create({
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
  userDetailsContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  signalContainer: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 70,
  },
  separator: {
    height: "100%",
    width: 2,
    backgroundColor: theme.colors.black,
    opacity: 0.2,
  },
  replyButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.gray,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
  replyButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  replyButtonTitle: {
    fontWeight: "600",
    color: theme.colors.black,
    opacity: 0.5,
  },
  replyButtonFilled: {
    justifyContent: "center",
    alignItems: "center",
    color: theme.colors.white,
    backgroundColor: theme.colors.black,
    borderRadius: 10,
    paddingVertical: 20,
    width: "50%",
  },
})

Index.displayName = "Signaling"

export default Index
