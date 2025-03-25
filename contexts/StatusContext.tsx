import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react"
import { SharedValue, useSharedValue } from "react-native-reanimated"
import { useMySignal } from "@/queries/signal"

export type TemporaryStatusType = {
  timeSlot: string
  startsAt?: Date
  endsAt?: Date
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
  const isOn = useSharedValue(!signalData?.hasEnded)
  const [temporaryStatus, setTemporaryStatus] = useState<TemporaryStatusType>({
    friendIds: signalData?.friendIds || [],
    activity: signalData?.status_message || "",
    timeSlot: signalData?.when || "",
  })

  useEffect(() => {
    if (!signalData) return
    const friendIds = signalData.friends.map((friend) => friend.friendId)

    setTemporaryStatus({
      friendIds,
      activity: signalData.status_message,
      timeSlot: signalData.when,
    })

    isOn.value = !signalData?.hasEnded
  }, [isOn, signalData])

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
