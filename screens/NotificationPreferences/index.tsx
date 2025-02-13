import AlertDialog from "@/components/AlertDialog"
import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import CustomSwitch from "@/components/ui/CustomSwitch"
import CustomText from "@/components/ui/CustomText"
import UserInfo from "@/components/UserInfo"
import { useFriends, useSetNotificationPreferences } from "@/queries/friends"
import { theme } from "@/theme"
import { Friend } from "@/types"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { StyleSheet, TouchableOpacity, View } from "react-native"

export default function NotificationPreferences() {
  const { data: allFriends, isLoading } = useFriends(true)
  const setNotificationPreferences = useSetNotificationPreferences()

  const updatePreferences = async (friend: Friend) => {
    setNotificationPreferences.mutate({
      enableNotification: !friend.hasNotificationEnabled,
      friendId: friend.id,
    })
  }

  const handleToggleSwitch = async (friend: Friend) => {
    if (setNotificationPreferences.isPending) return
    if (friend.hasNotificationEnabled) {
      updatePreferences(friend)
      return
    }

    AlertDialog.open({
      title: `Stay updated with ${friend.username}?`,
      description: `Do you want to get notified whenever ${friend.names} shares updates? You can adjust this preference later.`,
      variant: "confirm",
      confirmText: "yes",
      cancelText: "no",
      onConfirm: () => updatePreferences(friend),
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomText size="lg" fontWeight="semibold">
          Stay in the Loop with Your Friends
        </CustomText>
        <CustomText>
          Pick which friends you want to get notifications from. You’re in
          control—switch them on or off anytime!
        </CustomText>
      </View>

      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.friendsList}>
        {isLoading ? (
          <FriendsSkeleton />
        ) : allFriends && allFriends.length !== 0 ? (
          allFriends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.friendContainer}
              disabled={false}
              onPress={() => handleToggleSwitch(friend)}>
              <UserInfo
                fullName={friend.names}
                username={friend.username}
                style={styles.friendInfo}
              />
              <CustomSwitch
                onPress={() => handleToggleSwitch(friend)}
                switchTrackBackground={
                  friend.hasNotificationEnabled
                    ? theme.colors.black
                    : theme.colors.black_200
                }
                thumbBackground={theme.colors.white}
                isOn={friend.hasNotificationEnabled}
              />
            </TouchableOpacity>
          ))
        ) : (
          <CustomText size="sm">You currently have no friends!</CustomText>
        )}
      </BottomSheetScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  header: { gap: 6 },
  friendsList: {
    marginTop: 24,
  },
  friendContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  friendInfo: {
    flex: 1,
  },
})
