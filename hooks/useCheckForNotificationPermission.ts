import { useNotification } from "../contexts/NotificationContext"
import { Friend } from "../types"
import { useEffect } from "react"

const useCheckForNotificationPermission = (friends: Friend[]) => {
  const { registerForNotifications } = useNotification()
  useEffect(() => {
    if (friends.length === 0) return
    const hasFriendWithNotificationEnabled = friends.some(
      (friend) => friend.hasNotificationEnabled,
    )

    if (hasFriendWithNotificationEnabled) {
      registerForNotifications()
    }
  }, [friends, registerForNotifications])
}

export default useCheckForNotificationPermission
