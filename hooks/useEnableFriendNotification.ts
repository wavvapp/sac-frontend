import AlertDialog from "@/components/AlertDialog"
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
    if (friend.hasNotificationEnabled) {
      updatePreferences(friend)
      return
    }

    AlertDialog.open({
      title: `Stay updated with ${friend.username}?`,
      description: `Do you want to get notified whenever ${friend.names} shares updates? You can adjust this preference later.`,
      variant: "confirm",
      confirmText: "yes",
      cancelText: "no",
      onConfirm: () => updatePreferences(friend),
    })
  }

  return { changePreferences }
}
