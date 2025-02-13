import AlertDialog from "@/components/AlertDialog"
import { useSetNotificationPreferences } from "@/queries/friends"
import { Friend } from "@/types"

export const useEnableFriendNotification = () => {
  const setNotificationPreferences = useSetNotificationPreferences()
  const updatePreferences = async (friend: Friend) => {
    setNotificationPreferences.mutate({
      enableNotification: !friend.hasNotificationEnabled,
      friendId: friend.id,
    })
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
