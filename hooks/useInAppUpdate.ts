import { useEffect } from "react"
import { Platform } from "react-native"

import * as ExpoInAppUpdates from "expo-in-app-updates"
import AlertDialog from "../components/AlertDialog"

const useInAppUpdates = () => {
  useEffect(() => {
    if (__DEV__ || Platform.OS === "web") return

    const checkForUpdate = async () => {
      if (Platform.OS === "android") {
        ExpoInAppUpdates.checkForUpdate()
          .then(async ({ updateAvailable }) => {
            if (updateAvailable) await ExpoInAppUpdates.startUpdate(true)
          })
          .catch((err) => {
            console.error("Error checking for update:", err)
          })
      } else {
        ExpoInAppUpdates.checkForUpdate().then(({ updateAvailable }) => {
          AlertDialog.open({
            description: `A new version of the app is available with many improvements and bug fixes. ${updateAvailable ? "Update now" : "Check later"}`,
            title: `Update available`,
            variant: "confirm",
            confirmText: "Update",
            cancelText: "Cancel",
            onConfirm: async () => {
              await ExpoInAppUpdates.startUpdate(true)
            },
          })

          if (!updateAvailable) return

          AlertDialog.open({
            description:
              "A new version of the app is available with many improvements and bug fixes. Would you like to update now?",
            title: `Update available`,
            variant: "confirm",
            confirmText: "Update",
            cancelText: "Cancel",
            onConfirm: async () => {
              await ExpoInAppUpdates.startUpdate(true)
            },
          })
        })
      }
    }

    checkForUpdate()
  }, [])
}

export default useInAppUpdates
