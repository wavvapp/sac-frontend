import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import Constants from "expo-constants"
import { Platform } from "react-native"

export const checkForNotificationPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  return existingStatus !== "granted"
}
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#000000", // color for the around of the notification icon
    })
  }

  if (Device.isDevice) {
    const isRegistered = await checkForNotificationPermission()
    if (isRegistered) {
      await Notifications.requestPermissionsAsync()
    } else {
      throw new Error(
        "Permission not granted to get push token for push notification!",
      )
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId
    if (!projectId) {
      throw new Error("Project ID not found in eas config file")
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      console.log("token", pushTokenString)
      return pushTokenString
    } catch (e: unknown) {
      throw new Error(`${e}`)
    }
  } else {
    throw new Error("Must use physical device for push notifications")
  }
}
