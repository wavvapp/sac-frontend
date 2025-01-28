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

interface NotificationContextType {
  expoPushToken: string | null
  notification: Notifications.Notification | null
  error: Error | null
}

const NotificationContext = createContext<NotificationContextType | null>(null)

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
  const [error, setError] = useState<Error | null>(null)

  const notificationListener = useRef<Subscription>()

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token),
      (error) => setError(error),
    )

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
      value={{ expoPushToken, notification, error }}>
      {children}
    </NotificationContext.Provider>
  )
}
