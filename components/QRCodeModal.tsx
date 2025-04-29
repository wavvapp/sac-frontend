import { View, StyleSheet } from "react-native"
import ModalBottomSheet from "./ui/ModalBottomSheet"
import CustomText from "./ui/CustomText"
import { CustomButton } from "./ui/Button"
import QRCode from "react-native-qrcode-svg"
import { onShare } from "../utils/share"

const WAVV_APP_WEBSITE = "https://wavvapp.com"
export default function QRCodeModal({
  onClose,
  userId,
  username,
  names,
}: {
  onClose: () => void
  userId: string
  username: string
  names: string
}) {
  const addFriendDeepLink = (userId: string) => {
    return `${WAVV_APP_WEBSITE}/open?screen=Home&userId=${userId}&username=${username}&names=${names}`
  }

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
      <QRCode size={230} value={addFriendDeepLink(userId)} />
      <CustomButton
        containerStyles={{ height: 56, paddingHorizontal: 40 }}
        onPress={() => {
          onShare(username)
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
