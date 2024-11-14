import { User } from "@/types"
import { View, StyleSheet } from "react-native"
import UserAvatar from "@/components/ui/UserAvatar"
import UserAvailability from "@/components/cards/UserAvailability"
import UserInfo from "@/components/UserInfo"
interface SignalingUserProps {
  user: User
  online: boolean
  isLast: boolean
  isFirst: boolean
}

export default function SignalingUser({
  user,
  online,
  isLast,
  isFirst,
}: SignalingUserProps) {
  return (
    <View
      style={[
        styles.userCard,
        isLast && styles.lastCardInTheListStyles,
        isFirst && styles.firstCardInTheListStyles,
      ]}>
      <UserAvatar imageUrl={user.profilePictureUrl} />
      <View>
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
  lastCardInTheListStyles: {
    paddingBottom: 20,
  },
  firstCardInTheListStyles: {
    paddingTop: 20,
  },
})
