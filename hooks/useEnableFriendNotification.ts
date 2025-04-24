import { useSetNotificationPreferences } from "@/queries/friends"
import { Friend } from "@/types"
import { useQueryClient } from "@tanstack/react-query"
import { useNotification } from "@/contexts/NotificationContext"

export const useEnableFriendNotification = () => {
  const queryClient = useQueryClient()
  const setNotificationPreferences = useSetNotificationPreferences()
  const { registerForNotifications } = useNotification()

  const updatePreferences = async (friend: Friend) => {
    const enabled = !friend.hasNotificationEnabled
    const previousFriends = queryClient.getQueryData<Friend[]>([
      "friend-signals",
    ])
    queryClient.setQueryData<Friend[]>(["friend-signals"], (oldFriends = []) =>
      oldFriends.map((oldFriend) =>
        oldFriend.id === friend.id
          ? { ...oldFriend, hasNotificationEnabled: enabled }
          : oldFriend,
      ),
    )
    if (enabled) {
      await registerForNotifications?.()
    }
    try {
      console.log({ enableNotification: enabled, friendId: friend.id })
      setNotificationPreferences.mutate({
        enableNotification: enabled,
        friendId: friend.id,
      })
    } catch (error) {
      queryClient.setQueryData<Friend[]>(["friend-signals"], previousFriends)
      console.error("Error enabling friend notification:", error)
    }
  }

  const changePreferences = (friend: Friend) => {
    if (setNotificationPreferences.isPending) return
    updatePreferences(friend)
    return
  }

  return { changePreferences }
}
