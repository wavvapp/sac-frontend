import { View, StyleSheet } from "react-native"
import ModalBottomSheet from "../ui/ModalBottomSheet"
import CustomText from "../ui/CustomText"
import { CustomButton } from "../ui/Button"
import { onShare } from "../../utils/share"
import InviteFriendQRCode from "./InviteFriendQRCode"
import { User } from "@/types"

export default function QRCodeModal({
  onClose,
  user,
}: {
  onClose: () => void
  user: User
}) {
  return (
    <ModalBottomSheet
      modalStyle={styles.modalStyle}
      toggleModalBottomSheet={onClose}>
      <View style={styles.modalDescription}>
        <CustomText fontWeight="bold" size="lg" style={{ textAlign: "center" }}>
          Invite Friends
        </CustomText>
        <CustomText style={{ textAlign: "center", lineHeight: 20 }}>
          Let your friend scan the QR code or send them the link
        </CustomText>
      </View>
      <InviteFriendQRCode user={user} />
      <CustomButton
        containerStyles={{ height: 56, paddingHorizontal: 40 }}
        onPress={() => {
          onShare(user.username)
        }}
        title="Share Link"
      />
    </ModalBottomSheet>
  )
}

const styles = StyleSheet.create({
  modalStyle: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 32,
    paddingBottom: 32,
  },
  modalDescription: {
    width: "60%",
    flexDirection: "column",
    gap: 5,
    paddingTop: 5,
    marginBottom: -10,
  },
})
