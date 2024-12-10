import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react"
import api from "@/service"
import { useAuth } from "./AuthContext"
import { Signal } from "@/types"
import { useSignal } from "@/hooks/useSignal"

export type TemporaryStatusType = {
  timeSlot: string
  activity: string
  friendIds: string[]
}

export type SavedStatusType = {
  timeSlot: string
  activity: string
  friendIds: string[]
}

type StatusContextType = {
  temporaryStatus: TemporaryStatusType
  savedStatus: SavedStatusType
  saveStatus: () => void
  setTemporaryStatus: Dispatch<SetStateAction<TemporaryStatusType>>
  updateActivity: () => Promise<void>
  updateSignal: (signal: Signal) => Promise<void>
  clearStatus: () => void
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, updateUserInfo } = useAuth()

  const initialStatus = {
    timeSlot: "NOW",
    activity: user?.activity || "",
    friendIds: [],
  }
  const [temporaryStatus, setTemporaryStatus] =
    useState<TemporaryStatusType>(initialStatus)
  const [savedStatus, setSavedStatus] = useState<SavedStatusType>({
    timeSlot: temporaryStatus.timeSlot,
    activity: temporaryStatus.activity,
    friendIds: temporaryStatus.friendIds,
  })
  const { fetchMySignal } = useSignal()
  const updateSignal = useCallback(async (signal: Signal) => {
    const { friends, status_message, when } = signal
    setTemporaryStatus({
      friendIds: friends,
      activity: status_message,
      timeSlot: when,
    })
    setSavedStatus({
      friendIds: friends,
      activity: status_message,
      timeSlot: when,
    })
    await updateUserInfo(status_message, when)
    return
  }, [])

  const fetchInitialStatus = useCallback(async () => {
    try {
      const data = await fetchMySignal()
      if (!data) return
      await updateSignal(data)
    } catch (error) {
      console.error("Error fetching initial activity status:", error)
    }
  }, [fetchMySignal, updateSignal])

  useEffect(() => {
    fetchInitialStatus()
  }, [fetchInitialStatus])

  const updateActivity = async () => {
    try {
      const { data } = await api.put("/my-signal", {
        friends: savedStatus.friendIds,
        status_message: savedStatus.activity,
        when: savedStatus.timeSlot,
      })
      return data
    } catch (error) {
      console.error("Error updating activity status:", error)
      throw error
    }
  }

  const saveStatus = () => {
    setSavedStatus(temporaryStatus)
  }

  const clearStatus = () => {
    setTemporaryStatus(savedStatus)
  }

  return (
    <StatusContext.Provider
      value={{
        savedStatus,
        clearStatus,
        temporaryStatus,
        setTemporaryStatus,
        saveStatus,
        updateActivity,
        updateSignal,
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
