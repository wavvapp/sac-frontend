import UserInfo from "@/components/UserInfo"
import { User } from "@/types"
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import CheckBox from "@/components/ui/CheckBox"

export default function FriendCard({
  user,
  handleChange,
  selected = false,
  containerStyles = {},
}: {
  user: User
  handleChange: (arg1: string) => void
  selected: boolean
  containerStyles?: TouchableOpacityProps["style"]
}) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyles]}
      onPress={() => handleChange(user.id)}>
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
