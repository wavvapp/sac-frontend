import { theme } from "@/theme"
import { User } from "@/types"
import { StyleSheet, View } from "react-native"
import { CustomButton } from "../ui/Button"
import CustomText from "../ui/CustomText"

export default function AddFriend({
  user,
  onAddFriend,
}: {
  user: User
  onAddFriend: () => void
}) {
  return (
    <View style={styles.container}>
      <CustomText style={{ textAlign: "center" }} fontWeight="semibold">
        {user?.names}{" "}
        <CustomText
          fontFamily="writer-monos"
          style={{
            color: theme.colors.light_gray,
          }}>
          @{user?.username}
        </CustomText>
      </CustomText>
      <CustomText fontWeight="bold" size="lg" style={{ textAlign: "center" }}>
        Add me to your friends
      </CustomText>
      <CustomButton
        containerStyles={{ height: 56, paddingHorizontal: 40 }}
        onPress={onAddFriend}
        title="Add to friends"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 40,
  },
})
