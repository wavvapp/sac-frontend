import { User } from "@/types"
import { View, StyleSheet } from "react-native"
import UserAvatar from "@/components/ui/UserAvatar"
import UserAvailability from "@/components/cards/UserAvailability"

export default function AvailableUser(user: User) {
  return (
    <View style={styles.userCard}>
      <UserAvatar imageUrl={user.imageUrl || 0} />
      <View>
        <UserAvailability
          firstName={user.firstName}
          lastName={user.lastName}
          time={user.time}
          activity={user.activity}
        />
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
})
