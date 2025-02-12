import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import Constants from "expo-constants"
import { Platform } from "react-native"

// export const checkForNotificationPermission = async () => {
//   const { status: existingStatus } = await Notifications.getPermissionsAsync()
//   return existingStatus !== "granted"
// }
export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#000000", // color for the around of the notification icon
    })
  }

  function handleRegistrationError(errorMessage: string) {
    alert(errorMessage)
    throw new Error(errorMessage)
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!",
      )
      return
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId
    if (!projectId) {
      handleRegistrationError("Project ID not found")
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data
      console.log(pushTokenString)
      return pushTokenString
    } catch (e: unknown) {
      handleRegistrationError(`${e}`)
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications")
  }
}

//   if (Device.isDevice) {
//     const isRegistered = await checkForNotificationPermission()
//     console.log("isRegistered", isRegistered)
//     if (isRegistered) {
//       const permissions = await Notifications.requestPermissionsAsync()
//       console.log("permissions from request permissions async", permissions)
//     } else {
//       throw new Error(
//         "Permission not granted to get push token for push notification!",
//       )
//     }

//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ??
//       Constants?.easConfig?.projectId
//     if (!projectId) {
//       throw new Error("Project ID not found in eas config file")
//     }
//     try {
//       const pushTokenString = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data
//       console.log("token", pushTokenString)
//       return pushTokenString
//     } catch (e: unknown) {
//       throw new Error(`${e}`)
//     }
//   } else {
//     throw new Error("Must use physical device for push notifications")
//   }
// }
