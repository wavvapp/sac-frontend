import React, { createContext, useContext, useState } from "react"
import api from "@/service"

type StatusContextType = {
  statusMessage: string
  friends: string[]
  timeSlot: string
  setStatusMessage: (message: string) => void
  setFriends: (friends: string[]) => void
  setTimeSlot: (timeSlot: string) => void
  saveStatus: () => void
  updateActivity: () => Promise<void>
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [statusMessage, setStatusMessage] = useState("Available")
  const [friends, setFriends] = useState<string[]>([])
  const [timeSlot, setTimeSlot] = useState("NOW")

  const updateActivity = async () => {
    try {
      const response = await api.put("/my-signal", {
        friends,
        status_message: statusMessage,
        when: timeSlot,
      })

      const { friends: updatedFriends, status_message, when } = response.data
      setFriends(updatedFriends)
      setStatusMessage(status_message)
      setTimeSlot(when)
    } catch (error) {
      console.error("Error fetching activity status:", error)
    }
  }

  const saveStatus = async () => {
    console.log("Saving status with values:", {
      statusMessage,
      friends,
      timeSlot,
    })
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
