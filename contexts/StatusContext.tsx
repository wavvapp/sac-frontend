import { createContext, useContext, useCallback, useState } from "react"
import api from "@/service"
import { useAuth } from "./AuthContext"
import { Signal } from "@/types"

type StatusContextType = {
  statusMessage: string
  friendIds: string[]
  timeSlot: string
  setStatusMessage: (message: string) => void
  setFriendIds: (friends: string[]) => void
  setTimeSlot: (timeSlot: string) => void
  updateActivity: () => Promise<void>
  updateSignal: (signal: Signal) => Promise<void>
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, updateUserInfo } = useAuth()
  const [statusMessage, setStatusMessage] = useState(user?.activity || "")
  const [friendIds, setFriendIds] = useState<string[]>([])
  const [timeSlot, setTimeSlot] = useState("NOW")

  const updateSignal = useCallback(async (signal: Signal) => {
    const { friends, status_message, when } = signal
    setFriendIds(friends)
    setStatusMessage(status_message)
    setTimeSlot(when)
    await updateUserInfo(status_message, when)
    return
  }, [])

  const updateActivity = async () => {
    try {
      const signal: Signal = {
        friends: friendIds,
        status_message: statusMessage,
        when: timeSlot,
      }
      await updateSignal(signal)
      const { data } = await api.put("/my-signal", signal)
      return data
    } catch (error) {
      console.error("Error updating activity status:", error)
      throw error
    }
  }

  return (
    <StatusContext.Provider
      value={{
        statusMessage,
        friendIds,
        timeSlot,
        setStatusMessage,
        setFriendIds,
        setTimeSlot,
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
