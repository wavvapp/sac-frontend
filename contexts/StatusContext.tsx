import { createContext, useContext, useState } from "react"
import api from "@/service"
import { useAuth } from "./AuthContext"
import { Friend } from "@/types"

type StatusContextType = {
  statusMessage: string
  friends: string[]
  timeSlot: string
  setStatusMessage: (message: string) => void
  setFriends: (friends: string[]) => void
  setTimeSlot: (timeSlot: string) => void
  updateActivity: () => Promise<void>
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  const [statusMessage, setStatusMessage] = useState(user?.activity || "")
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
      const friendsId = updatedFriends.map((friend: Friend) => friend.id)
      setFriends(friendsId)
      setStatusMessage(status_message)
      setTimeSlot(when)
      return response.data
    } catch (error) {
      console.error("Error updating activity status:", error)
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
