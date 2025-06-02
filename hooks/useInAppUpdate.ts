import { useEffect } from "react"
import { Platform } from "react-native"

import * as ExpoInAppUpdates from "expo-in-app-updates"
import AlertDialog from "../components/AlertDialog"
import axios from "axios"
import { ITuneLookupResponse } from "@/types/iTuneLookupResponse"
import Constants from "expo-constants"
import { formatAppVersionToNumber } from "@/utils/formatAppVersionToNumber"

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
        let iTunesResult: ITuneLookupResponse["results"][0] | undefined

        if (
          Platform.OS === "ios" &&
          !!Constants.expoConfig?.ios?.bundleIdentifier
        ) {
          const response = await axios.get<ITuneLookupResponse>(
            `https://itunes.apple.com/lookup?bundleId=${Constants.expoConfig?.ios?.bundleIdentifier}`,
          )

          if (response.data.results[0]) {
            iTunesResult = response.data.results[0]
          }
        }

        if (!Constants.expoConfig?.version || !iTunesResult?.version) return
        const installedAppVersion = formatAppVersionToNumber(
          Constants.expoConfig.version,
        )
        const latestAvailableVersion = formatAppVersionToNumber(
          iTunesResult.version,
        )

        if (installedAppVersion < latestAvailableVersion) {
          AlertDialog.open({
            description: `A new version of the app is available with many improvements and bug fixes`,
            title: `Update available`,
            variant: "confirm",
            confirmText: "Update",
            cancelText: "Cancel",
            onConfirm: async () => {
              await ExpoInAppUpdates.startUpdate(true)
            },
          })
        }
      }
    }

    checkForUpdate()
  }, [])
}

export default useInAppUpdates
