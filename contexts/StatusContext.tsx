import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from "react"
import { SharedValue, useSharedValue } from "react-native-reanimated"
import { useMySignal } from "@/queries/signal"
import { Group, Signal } from "@/types"
import dayjs from "dayjs"
import { AppState } from "react-native"
import * as Notifications from "expo-notifications"

export type TemporaryStatusType = {
  timeSlot: string
  startsAt: Date
  endsAt: Date
  activity: string
  friendIds: string[]
  groups: Group[]
}

type StatusContextType = {
  temporaryStatus: TemporaryStatusType
  setTemporaryStatus: Dispatch<SetStateAction<TemporaryStatusType>>
  isOn: SharedValue<boolean>
  signal?: Signal
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: signal, refetch: refetchSignal } = useMySignal()

  const dateEnded = useMemo(
    () => dayjs().isAfter(dayjs(signal?.endsAt)),
    [signal?.endsAt],
  )

  const isOn = useSharedValue(!dateEnded)
  const checkDateAndUpdateStatus = useCallback(() => {
    if (signal?.endsAt) {
      const hasEnded = dayjs().isAfter(signal?.endsAt)
      isOn.value = !hasEnded
    }
  }, [isOn, signal?.endsAt])

  useEffect(() => {
    const subscription = AppState.addEventListener("change", () => {
      checkDateAndUpdateStatus()
      refetchSignal()
    })
    return () => subscription.remove()
  }, [checkDateAndUpdateStatus, refetchSignal])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(() => {
      refetchSignal()
    })
    return () => subscription.remove()
  }, [refetchSignal])

  const [temporaryStatus, setTemporaryStatus] = useState<TemporaryStatusType>({
    friendIds: signal?.friendIds || [],
    activity: signal?.status_message || "",
    timeSlot: isOn.value ? signal?.when || "NOW" : "NOW",
    endsAt: signal?.endsAt || new Date(),
    startsAt: signal?.startsAt || new Date(),
    groups: signal?.groups || [],
  })

  useEffect(() => {
    if (!signal) return
    const friendIds = signal.friends.map((friend) => friend.friendId)

    setTemporaryStatus({
      friendIds,
      activity: signal.status_message,
      timeSlot: !isOn.value ? "NOW" : signal.when,
      endsAt: signal.endsAt,
      startsAt: signal.startsAt,
      groups: signal.groups,
    })
  }, [isOn.value, signal])

  return (
    <StatusContext.Provider
      value={{
        temporaryStatus,
        setTemporaryStatus,
        signal,
        isOn,
      }}>
      {children}
    </StatusContext.Provider>
  )
}

export const useStatus = () => {
  const context = useContext(StatusContext)
  if (!context)
    throw new Error("useStatus must be used within a StatusProvider")
  return context
}
