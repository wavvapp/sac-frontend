import { User } from "@/types"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import UserAvailability from "@/components/cards/UserAvailability"
import UserInfo from "@/components/UserInfo"
import { theme } from "@/theme"
import BellIcon from "@/components/vectors/BellIcon"

interface SignalingUserProps {
  user: User
  online: boolean
  isLast: boolean
  isFirst: boolean
  notificationEnabled: boolean
}

export default function SignalingUser({
  user,
  online,
  isLast,
  isFirst,
  notificationEnabled,
}: SignalingUserProps) {
  const bellColor = notificationEnabled
    ? theme.colors.black
    : theme.colors.black_200
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
          />
        ) : (
          <UserInfo fullName={user.names} username={user.username} />
        )}
      </View>
      <TouchableOpacity>
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
  availableUserContainer: {
    backgroundColor: theme.colors.white,
  },
})
