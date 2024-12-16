import {
  createContext,
  useContext,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react"
// import api from "@/service"
import { useAuth } from "./AuthContext"
import { Signal } from "@/types"
import { SharedValue, useSharedValue } from "react-native-reanimated"
import { useFetchMySignal } from "@/hooks/useSignal"
// import { useSignal } from "@/hooks/useSignal"

export type TemporaryStatusType = {
  timeSlot: string
  activity: string
  friendIds: string[]
}

type StatusContextType = {
  temporaryStatus: TemporaryStatusType
  // savedStatus: SavedStatusType
  // saveStatus: () => void
  setTemporaryStatus: Dispatch<SetStateAction<TemporaryStatusType>>
  // updateActivity: () => Promise<void>
  // clearStatus: () => void
  isOn: SharedValue<boolean>
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { updateUserInfo } = useAuth()
  const isOn = useSharedValue(false)

  const { data: signalData } = useFetchMySignal()
  const [temporaryStatus, setTemporaryStatus] = useState<TemporaryStatusType>({
    friendIds: signalData.friendIds,
    activity: signalData.status_message,
    timeSlot: signalData.when,
  })
  const updateSignal = useCallback(async (signal: Signal) => {
    const { friendIds, status_message, when } = signal
    setTemporaryStatus({
      friendIds,
      activity: status_message,
      timeSlot: when,
    })
    // setSavedStatus({
    //   friendIds,
    //   activity: status_message,
    //   timeSlot: when,
    // })
    await updateUserInfo(status_message, when)
    return
  }, [])

  useEffect(() => {
    if (!signalData) return
    const signal = {
      ...signalData,
      friendIds: signalData.friends.map((friend) => friend.friendId),
    }

    console.log("use-effect optimistically being updated.")
    updateSignal(signal)
  }, [updateSignal, signalData])

  // const updateActivity = async () => {
  //   try {
  //     console.log(JSON.stringify(temporaryStatus, null, 2))
  //     const { data } = await api.put("/my-signal", {
  //       friends: temporaryStatus.friendIds,
  //       status_message: temporaryStatus.activity,
  //       when: temporaryStatus.timeSlot,
  //     })
  //     return data
  //   } catch (error) {
  //     console.error("Error updating activity status:", error)
  //     throw error
  //   }
  // }

  // const saveStatus = () => {
  //   setSavedStatus(temporaryStatus)
  // }

  // const clearStatus = () => {
  //   setTemporaryStatus(savedStatus)
  // }

  useEffect(() => {
    isOn.value = signalData?.status === "active"
    // setTemporaryStatus()
  }, [isOn, signalData])

  return (
    <StatusContext.Provider
      value={{
        // savedStatus,
        // clearStatus,
        temporaryStatus,
        setTemporaryStatus,
        // saveStatus,
        // updateActivity,
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
