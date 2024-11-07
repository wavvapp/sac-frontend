import UserAvatar from "@/components/ui/UserAvatar"
import UserInfo from "@/components/UserInfo"
import { User } from "@/types"
import { StyleSheet, TouchableOpacity } from "react-native"
import CheckBox from "@/components/ui/CheckBox"

export default function FriendCard({
  user,
  handleChange,
}: {
  user: User
  handleChange: (arg1: string) => void
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleChange(user.id)}>
      <UserAvatar imageUrl={user?.profilePictureUrl} />
      <UserInfo
        fullName={user?.names}
        username={user.username}
        style={styles.useInfoStyles}
      />
      <CheckBox isChecked={!!user.selected} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  useInfoStyles: {
    flexGrow: 1,
  },
})
