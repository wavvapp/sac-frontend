import CustomText from "@/components/ui/CustomText"
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
      <CheckBox isChecked={!!user.selected} />
      <CustomText size="base" style={styles.text}>
        {user.firstName} {user.lastName}
      </CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 32,
    gap: 8,
  },
  text: {
    textTransform: "capitalize",
  },
})
