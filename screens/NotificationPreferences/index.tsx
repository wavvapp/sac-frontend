import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import CustomSwitch from "@/components/ui/CustomSwitch"
import CustomText from "@/components/ui/CustomText"
import UserInfo from "@/components/UserInfo"
import { useFriends } from "@/queries/friends"
import { theme } from "@/theme"
import { Friend } from "@/types"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

export default function NotificationPreferences() {
  const { data: allFriends, isLoading } = useFriends(true)
  const [enabledFriends, setEnabledFriends] = useState<Friend[]>([])

  //TODO: Once allFriends data BE from the backend has a notificationEnabled field, change the logic to update that field
  const handleSwitchPress = (friend: Friend) => {
    setEnabledFriends((prev) => {
      const isEnabled = prev.find((f) => f.id === friend.id)
      if (isEnabled) {
        return prev.filter((f) => f.id !== friend.id)
      } else {
        return [...prev, friend]
      }
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
              onPress={() => handleSwitchPress(friend)}>
              <UserInfo
                fullName={friend.names}
                username={friend.username}
                style={styles.friendInfo}
              />
              <CustomSwitch
                onPress={() => handleSwitchPress(friend)}
                //TODO: Once allFriends data BE from the backend has a notificationEnabled field, use that field instead of enabledFriends[friend.id]
                switchTrackBackground={
                  enabledFriends.find((f) => f.id === friend.id)
                    ? theme.colors.black
                    : theme.colors.black_200
                }
                thumbBackground={theme.colors.white}
                //TODO: Once allFriends data BE from the backend has a notificationEnabled field, use that field instead of enabledFriends[friend.id]
                isOn={!!enabledFriends.find((f) => f.id === friend.id)}
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
