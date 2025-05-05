import ModalBottomSheet from "../ui/ModalBottomSheet"
import { StyleSheet } from "react-native"
import { useState } from "react"
import NotificationDialog from "./NotificationDialog"
import AddFriend from "./AddFriend"
import { useAddFriend } from "@/queries/friends"
import { useNotification } from "@/contexts/NotificationContext"

export default function AddToFriendModal({
  username,
  names,
  friendIdFromDeepLink,
  onClose,
  isVisible,
}: {
  username: string
  names: string
  friendIdFromDeepLink: string
  onClose: () => void
  isVisible: boolean
}) {
  const [showNotificationMessage, setShowNotificationMessage] = useState(false)
  const { mutateAsync: addfriend } = useAddFriend()
  const { registerForNotifications } = useNotification()

  const handleAddFriendWithNotificationStatus = async (
    hasNotificationEnabled: boolean,
  ) => {
    if (!hasNotificationEnabled) {
      await addfriend({
        friendId: friendIdFromDeepLink,
        hasNotificationEnabled: false,
      })
      onClose()
      return
    }

    try {
      await registerForNotifications()
      await addfriend({
        friendId: friendIdFromDeepLink,
        hasNotificationEnabled: true,
      })
    } catch (error) {
      console.error(error)
    } finally {
      onClose()
    }
  }

  return (
    <ModalBottomSheet
      isVisible={isVisible}
      modalStyle={styles.modalStyle}
      toggleModalBottomSheet={onClose}>
      {showNotificationMessage && (
        <NotificationDialog
          names={names}
          username={username}
          onEnableNotificationsForFriend={() => {
            handleAddFriendWithNotificationStatus(true)
          }}
          onCancelNotificationForFriend={() => {
            handleAddFriendWithNotificationStatus(false)
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
