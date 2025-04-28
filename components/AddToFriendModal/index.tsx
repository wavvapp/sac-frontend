import { User } from "@/types"
import ModalBottomSheet from "../ui/ModalBottomSheet"
import { StyleSheet } from "react-native"
import { useState } from "react"
import NotificationDialog from "./NotificationDialog"
import AddFriend from "./AddFriend"

export default function AddToFriendModal({
  user,
  onClose,
}: {
  user: User
  onClose: () => void
}) {
  const [showNotificationMessage, setShowNotificationMessage] = useState(false)

  return (
    <ModalBottomSheet
      modalStyle={styles.modalStyle}
      toggleModalBottomSheet={onClose}>
      {showNotificationMessage && (
        <NotificationDialog user={user} onClose={onClose} />
      )}
      {!showNotificationMessage && (
        <AddFriend
          user={user}
          onAddFriend={() => setShowNotificationMessage(true)}
        />
      )}
    </ModalBottomSheet>
  )
}

const styles = StyleSheet.create({
  modalStyle: {
    paddingBottom: 32,
  },
})
