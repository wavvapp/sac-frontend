import { createContext, useContext, useEffect, useState } from "react"
import api from "@/service"
import { useAuth } from "./AuthContext"
import { Friend } from "@/types"
import { useSignal } from "@/hooks/useSignal"

type StatusContextType = {
  statusMessage: string
  friendIds: string[]
  timeSlot: string
  setStatusMessage: (message: string) => void
  setFriendIds: (friends: string[]) => void
  setTimeSlot: (timeSlot: string) => void
  updateActivity: () => Promise<void>
  isLoading: boolean
}

const StatusContext = createContext<StatusContextType>({} as StatusContextType)

export const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  const [statusMessage, setStatusMessage] = useState(user?.activity || "")
  const [friendIds, setFriendIds] = useState<string[]>([])
  const [timeSlot, setTimeSlot] = useState("NOW")
  const [isLoading, setIsLoading] = useState(true)
  const { fetchMySignal } = useSignal()
  const fetchInitialStatus = async () => {
    try {
      const data = await fetchMySignal()
      setStatusMessage(data?.status_message)
      setFriendIds(data?.friends.map((friend: Friend) => friend.friendId) || [])
      setTimeSlot(data?.when)
    } catch (error) {
      console.error("Error fetching initial activity status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialStatus()
  }, [])

  const updateActivity = async () => {
    try {
      const { data } = await api.put("/my-signal", {
        friends: friendIds,
        status_message: statusMessage,
        when: timeSlot,
      })
      const signalFriendsId: string[] = data?.friends.map(
        (friend: Friend) => friend.friendId,
      )

      setFriendIds(signalFriendsId)
      setStatusMessage(data?.status_message)
      setTimeSlot(data?.when)
      return data
    } catch (error) {
      console.error("Error updating activity status:", error)
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
        isLoading,
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
