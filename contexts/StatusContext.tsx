import { createContext, useContext, useEffect, useState } from "react"
import api from "@/service"
import { useSignal } from "@/hooks/useSignal"
import { useAuth } from "./AuthContext"

type StatusContextType = {
  statusMessage: string
  friends: string[]
  timeSlot: string
  setStatusMessage: (message: string) => void
  setFriends: (friends: string[]) => void
  setTimeSlot: (timeSlot: string) => void
  saveStatus: () => void
  updateActivity: () => Promise<void>
  loading: boolean
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  const [statusMessage, setStatusMessage] = useState(user?.activity || "")
  const [friends, setFriends] = useState<string[]>([])
  const [timeSlot, setTimeSlot] = useState("NOW")
  const [loading, setLoading] = useState(true)
  const fetchInitialStatus = async () => {
    try {
      const response = await api.get("/my-signal")
      const { status_message, friends, when } = response.data

      setStatusMessage(status_message)
      setFriends(friends)
      setTimeSlot(when)
    } catch (error) {
      console.error("Error fetching initial activity status:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialStatus()
  }, [])

  const { fetchMySignal } = useSignal()
  const updateActivity = async () => {
    try {
      const response = await api.put("/my-signal", {
        friends,
        status_message: statusMessage,
        when: timeSlot,
      })
      await fetchMySignal()

      const { friends: updatedFriends, status_message, when } = response.data
      setFriends(updatedFriends)
      setStatusMessage(status_message)
      setTimeSlot(when)
    } catch (error) {
      console.error("Error fetching activity status:", error)
    }
  }

  const saveStatus = async () => {
    try {
      await updateActivity()
    } catch (error) {
      console.error("Error saving status:", error)
    }
  }

  return (
    <StatusContext.Provider
      value={{
        statusMessage,
        friends,
        timeSlot,
        setStatusMessage,
        setFriends,
        setTimeSlot,
        saveStatus,
        updateActivity,
        loading,
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
