import { useEffect } from "react"
import { Platform } from "react-native"

import * as ExpoInAppUpdates from "expo-in-app-updates"
import AlertDialog from "../components/AlertDialog"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { ITuneLookupResponse } from "@/types/iTuneLookupResponse"
import Constants from "expo-constants"
import { formatAppVersionToNumber } from "@/utils/formatAppVersionToNumber"

const useInAppUpdates = () => {
  const { data } = useQuery({
    queryKey: ["iTuneLookup"],
    queryFn: async () => {
      const response = await axios.get<ITuneLookupResponse>(
        `https://itunes.apple.com/lookup?bundleId=${Constants.expoConfig?.ios?.bundleIdentifier}`,
      )

      return response.data.results[0]
    },
    enabled:
      Platform.OS === "ios" &&
      !!Constants.expoConfig?.ios?.bundleIdentifier &&
      !__DEV__,
    staleTime: Infinity,
    retry: 2,
    retryDelay: 5000,
  })

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
        if (!Constants.expoConfig?.version || !data?.version) return
        const installedAppVersion = formatAppVersionToNumber(
          Constants.expoConfig?.version,
        )
        const latestAvailableVersion = formatAppVersionToNumber(data?.version)

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
  }, [data])
}

export default useInAppUpdates
