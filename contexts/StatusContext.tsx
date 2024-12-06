import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import api from "@/service"
import { useAuth } from "./AuthContext"
import { Signal } from "@/types"
type StatusContextType = {
  isOn: boolean
  toggleSignal: () => Promise<void>
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
  const [isOn, setIsOn] = useState(false)

  const fetchMySignal = useCallback(async () => {
    try {
      const { data: signal } = await api.get("/my-signal")
      setIsOn(signal.status === "active")
      const friendIds = signal.friends.map((friend: any) => friend.friendId)
      const mySignal: Signal = { ...signal, friends: friendIds }
      return mySignal
    } catch (error) {
      console.error("Error fetching signal:", error)
    }
  }, [])

  const toggleSignal = async () => {
    try {
      setIsOn((prevState) => !prevState)
      await api.post(`/my-signal/turn-${isOn ? "off" : "on"}`)
    } catch (error) {
      console.error("Error toggling signal:", error)
      setIsOn((prevState) => !prevState)
    }
  }

  const updateSignal = useCallback(async (signal: Signal) => {
    const { friends, status_message, when } = signal
    setFriendIds(friends)
    setStatusMessage(status_message)
    setTimeSlot(when)
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
        friends: friendIds,
        status_message: statusMessage,
        when: timeSlot,
      })
      return data
    } catch (error) {
      console.error("Error updating activity status:", error)
      throw error
    }
  }

  return (
    <StatusContext.Provider
      value={{
        isOn,
        toggleSignal,
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
