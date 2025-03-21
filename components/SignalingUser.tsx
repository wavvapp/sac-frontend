import { Friend } from "@/types"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import UserAvailability from "@/components/cards/UserAvailability"
import UserInfo from "@/components/UserInfo"
import { theme } from "@/theme"
import BellIcon from "@/components/vectors/BellIcon"
import { useEnableFriendNotification } from "@/hooks/useEnableFriendNotification"

interface SignalingUserProps {
  user: Friend
  online: boolean
  isLast: boolean
  isFirst: boolean
  hasNotificationEnabled: boolean
}

export default function SignalingUser({
  user,
  online,
  isLast,
  isFirst,
  hasNotificationEnabled,
}: SignalingUserProps) {
  const bellColor = hasNotificationEnabled
    ? theme.colors.black
    : theme.colors.black_200

  const { changePreferences } = useEnableFriendNotification()
  return (
    <View
      style={[
        styles.userCard,
        isLast && styles.lastCardInTheListStyles,
        isFirst && styles.firstCardInTheListStyles,
        !online && styles.offlineUserContainer,
      ]}>
      <View style={{ flex: 1 }}>
        {online ? (
          <UserAvailability
            fullName={user.names}
            time={user?.time}
            activity={user.activity}
          />
        ) : (
          <UserInfo fullName={user.names} username={user.username} />
        )}
      </View>
      <TouchableOpacity
        style={styles.BellIcon}
        onPress={() => changePreferences(user)}>
        <BellIcon width={16} height={16} color={bellColor} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  lastCardInTheListStyles: {
    paddingBottom: 20,
  },
  firstCardInTheListStyles: {
    paddingTop: 20,
  },
  offlineUserContainer: {
    backgroundColor: theme.colors.black_100,
  },
  BellIcon: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
})
