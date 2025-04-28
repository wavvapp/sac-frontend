import { User } from "@/types"
import { CustomButton } from "../ui/Button"
import CustomText from "../ui/CustomText"
import ModalBottomSheet from "../ui/ModalBottomSheet"
import { theme } from "@/theme"
import { StyleSheet } from "react-native"

export default function AddToFriendModal({
  user,
  onClose,
}: {
  user: User
  onClose: () => void
}) {
  return (
    <ModalBottomSheet
      modalStyle={styles.modalStyle}
      toggleModalBottomSheet={onClose}>
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
        onPress={() => null}
        title="Add to friends"
      />
    </ModalBottomSheet>
  )
}

const styles = StyleSheet.create({
  modalStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 40,
    paddingBottom: 32,
  },
})
