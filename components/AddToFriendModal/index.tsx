import ModalBottomSheet from "../ui/ModalBottomSheet"
import { StyleSheet } from "react-native"
import { useState } from "react"
import NotificationDialog from "./NotificationDialog"
import AddFriend from "./AddFriend"
import { useAddFriend } from "@/queries/friends"

export default function AddToFriendModal({
  username,
  names,
  friendIdFromDeepLink,
  onClose,
}: {
  username: string
  names: string
  friendIdFromDeepLink: string
  onClose: () => void
}) {
  const [showNotificationMessage, setShowNotificationMessage] = useState(false)
  const { mutateAsync: addfriend } = useAddFriend()

  return (
    <ModalBottomSheet
      modalStyle={styles.modalStyle}
      toggleModalBottomSheet={onClose}>
      {showNotificationMessage && (
        <NotificationDialog
          names={names}
          username={username}
          onEnableNotificationsForFriend={() => {
            addfriend({
              friendId: friendIdFromDeepLink,
              hasNotificationEnabled: true,
            })
            onClose()
          }}
          onCancelNotificationForFriend={() => {
            addfriend({
              friendId: friendIdFromDeepLink,
              hasNotificationEnabled: false,
            })
            onClose()
          }}
        />
      )}
      {!showNotificationMessage && (
        <AddFriend
          names={names}
          username={username}
          onAddFriend={() => {
            setShowNotificationMessage(true)
          }}
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
