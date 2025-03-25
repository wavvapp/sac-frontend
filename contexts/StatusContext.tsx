import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react"
import { SharedValue, useSharedValue } from "react-native-reanimated"
import { useMySignal } from "@/queries/signal"
import dayjs from "dayjs"

export type TemporaryStatusType = {
  timeSlot: string
  startsAt: Date
  endsAt: Date
  activity: string
  friendIds: string[]
}

type StatusContextType = {
  temporaryStatus: TemporaryStatusType
  setTemporaryStatus: Dispatch<SetStateAction<TemporaryStatusType>>
  isOn: SharedValue<boolean>
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: signalData } = useMySignal()

  const dateEnded = useMemo(
    () => dayjs().isAfter(dayjs(signalData?.endsAt)),
    [signalData?.endsAt],
  )

  const isOn = useSharedValue(!dateEnded)
  const [temporaryStatus, setTemporaryStatus] = useState<TemporaryStatusType>({
    friendIds: signalData?.friendIds || [],
    activity: signalData?.status_message || "",
    timeSlot: signalData?.when || "NOW",
    endsAt: signalData?.endsAt,
    startsAt: signalData?.startsAt,
  })

  useEffect(() => {
    if (!signalData) return
    const friendIds = signalData.friends.map((friend) => friend.friendId)

    setTemporaryStatus({
      friendIds,
      activity: signalData.status_message,
      timeSlot: signalData.when,
      endsAt: signalData.endsAt,
      startsAt: signalData.startsAt,
    })
    isOn.value = !dateEnded
  }, [isOn, signalData, dateEnded])

  return (
    <StatusContext.Provider
      value={{
        temporaryStatus,
        setTemporaryStatus,
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
