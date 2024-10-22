import { User } from "@/types"
import { View, StyleSheet } from "react-native"
import UserAvatar from "@/components/ui/UserAvatar"
import UserAvailability from "@/components/cards/UserAvailability"
import UserInfo from "@/components/UserInfo"
import { theme } from "@/theme"

export default function SignalingUser(
  user: User,
  online: boolean,
  index?: number,
) {
  return (
    <View
      style={[
        styles.userCard,
        !online && styles.availableUserCard,
        index === 0 && styles.firstCardInTheListStyles,
      ]}>
      <UserAvatar imageUrl={user.imageUrl || 0} />
      <View>
        {online ? (
          <UserAvailability
            firstName={user.firstName}
            lastName={user.lastName}
            time={user.time}
            activity={user.activity}
          />
        ) : (
          <UserInfo
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
          />
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  availableUserCard: {
    backgroundColor: theme.colors.black_100,
  },
  firstCardInTheListStyles: {
    paddingTop: 20,
    marginTop: 20,
  },
})
