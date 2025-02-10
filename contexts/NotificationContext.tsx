import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react"
import * as Notifications from "expo-notifications"
import { Subscription } from "expo-modules-core"
import { registerForPushNotificationsAsync } from "@/utils/registerForNotifications"
import { useRegisterExpoNotificationToken } from "@/queries/notifications"

interface NotificationContextType {
  expoPushToken: string | null
  notification: Notifications.Notification | null
  registerForNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType,
)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    )
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null)
  const submitNotificationToken = useRegisterExpoNotificationToken()
  const notificationListener = useRef<Subscription>()

  const registerForNotifications = async () => {
    try {
      const token = await registerForPushNotificationsAsync()
      if (token) {
        await submitNotificationToken.mutateAsync(token)
        setExpoPushToken(token)
      }
    } catch (error) {
      console.error("Error while registering for notifications: ", error)
    }
  }

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        )
      }
    }
  }, [])

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, registerForNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}
