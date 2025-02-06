import { onlineManager } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import NetInfo from "@react-native-community/netinfo"
import AlertDialog from "@/components/AlertDialog"

export const useOfflineHandler = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const onlineStatus = !!state.isConnected
      setIsOnline(onlineStatus)
      onlineManager.setOnline(onlineStatus)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleOfflineAction = useCallback(
    (action?: () => void) => {
      if (!isOnline) {
        AlertDialog.open()
        return false
      }
      if (action) {
        action()
      }
      return true
    },
    [isOnline],
  )
  return {
    isOnline,
    handleOfflineAction,
  }
}
