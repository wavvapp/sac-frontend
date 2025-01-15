import UserAvatar from "@/components/ui/UserAvatar"
import UserInfo from "@/components/UserInfo"
import { User } from "@/types"
import { StyleSheet, TouchableOpacity } from "react-native"
import CheckBox from "@/components/ui/CheckBox"

export default function FriendCard({
  user,
  handleChange,
  selected = false,
}: {
  user: User
  handleChange: (arg1: string) => void
  selected: boolean
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleChange(user.id)}>
      <UserAvatar imageUrl={user?.profilePictureUrl} />
      <UserInfo
        fullName={user?.names}
        username={user.username}
        style={styles.userInfoStyles}
      />
      <CheckBox isChecked={selected} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  userInfoStyles: {
    flexGrow: 1,
    flex: 1,
  },
})
