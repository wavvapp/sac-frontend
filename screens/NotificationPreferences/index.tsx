import { FriendsSkeleton } from "@/components/cards/FriendsSkeleton"
import CustomSwitch from "@/components/ui/CustomSwitch"
import CustomText from "@/components/ui/CustomText"
import UserInfo from "@/components/UserInfo"
import { useFriends } from "@/queries/friends"
import { theme } from "@/theme"
import { useState } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native"

export default function NotificationPreferences() {
  const { data: allFriends, isLoading } = useFriends(true)
  const [isEnabled, setIsEnabled] = useState(false)

  const handleSwitchPress = () => setIsEnabled(!isEnabled)

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

      <ScrollView style={styles.friendsList}>
        {isLoading ? (
          <FriendsSkeleton />
        ) : allFriends && allFriends.length !== 0 ? (
          allFriends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              style={styles.friendContainer}
              disabled={false}
              onPress={() => console.log("disable notification")}>
              <UserInfo
                fullName={friend.names}
                username={friend.username}
                style={styles.friendInfo}
              />
              <CustomSwitch
                onPress={handleSwitchPress}
                switchTrackBackground={
                  isEnabled ? theme.colors.black : theme.colors.black_200
                }
                thumbBackground={
                  isEnabled ? theme.colors.white : theme.colors.white
                }
                isOn={isEnabled}
              />
            </TouchableOpacity>
          ))
        ) : (
          <CustomText size="sm">You currently have no friends!</CustomText>
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
