import { useEffect } from "react"
import { Platform } from "react-native"

import * as ExpoInAppUpdates from "expo-in-app-updates"
import AlertDialog from "../components/AlertDialog"

const useInAppUpdates = () => {
  useEffect(() => {
    if (__DEV__ || Platform.OS === "web") return

    const checkForUpdate = async () => {
      if (Platform.OS === "android") {
        try {
          await ExpoInAppUpdates.startUpdate(true)
        } catch (err) {
          console.log({ err })
        }
      } else {
        ExpoInAppUpdates.checkForUpdate().then(({ updateAvailable }) => {
          if (!updateAvailable) return

          AlertDialog.open({
            description:
              "A new version of the app is available with many improvements and bug fixes. Would you like to update now?",
            title: `Update available`,
            variant: "confirm",
            confirmText: "Update",
            cancelText: "Cancel",
            onConfirm: async () => {
              await ExpoInAppUpdates.startUpdate()
            },
          })
        })
      }
    }

    checkForUpdate()
  }, [])
}

export default useInAppUpdates
