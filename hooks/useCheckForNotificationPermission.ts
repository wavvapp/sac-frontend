import { useQuery } from "@tanstack/react-query"
import { useNotification } from "../contexts/NotificationContext"
import { Friend } from "../types"

const useCheckForNotificationPermission = (friends: Friend[]) => {
  const { registerForNotifications } = useNotification()

  useQuery({
    queryKey: ["notificationPermission", friends],
    queryFn: async () => {
      const hasFriendWithNotificationEnabled = friends.some(
        (friend) => friend.hasNotificationEnabled,
      )

      if (hasFriendWithNotificationEnabled) {
        await registerForNotifications()
      }
    },
    enabled: friends?.length > 0,
    retry: 3,
    retryDelay: 5000,
  })
}

export default useCheckForNotificationPermission
