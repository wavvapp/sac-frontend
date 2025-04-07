import { Friend } from "@/types"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import UserAvailability from "@/components/cards/UserAvailability"
import UserInfo from "@/components/UserInfo"
import { theme } from "@/theme"
import { useEnableFriendNotification } from "@/hooks/useEnableFriendNotification"
import Badge from "@/components/ui/Badge"

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
  const { changePreferences } = useEnableFriendNotification()

  return (
    <View
      style={[
        styles.userCard,
        isLast && styles.lastCardInTheListStyles,
        isFirst && styles.firstCardInTheListStyles,
        online && styles.availableUserContainer,
      ]}>
      <View style={{ flex: 1 }}>
        {online ? (
          <UserAvailability
            fullName={user.names}
            time={user?.time}
            activity={user.activity}
            hasNotificationEnabled={hasNotificationEnabled}
            showNotificationIcon
          />
        ) : (
          <UserInfo
            fullName={user.names}
            username={user.username}
            showNotificationIcon={true}
            showUsername={true}
          />
        )}
      </View>
      {online && (
        <TouchableOpacity onPress={() => changePreferences(user)}>
          <Badge name="reply" variant="outline" />
        </TouchableOpacity>
      )}
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
  availableUserContainer: {
    backgroundColor: theme.colors.white,
  },
})
