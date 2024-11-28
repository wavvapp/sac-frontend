import { useStatus } from "@/contexts/StatusContext"
import api from "@/service"
import { useCallback, useEffect } from "react"
import { useSharedValue } from "react-native-reanimated"
import { Friend, Signal } from "@/types"

export const useSignal = () => {
  const isOn = useSharedValue(false)
  const { updateSignal } = useStatus()

  const fetchMySignal = useCallback(async () => {
    try {
      const { data: signal } = await api.get("/my-signal")
      isOn.value = signal.status === "active"
      const friendIds = signal.friends.map((friend: Friend) => friend.friendId)
      const mySignal: Signal = { ...signal, friends: friendIds }
      await updateSignal(mySignal)
      return mySignal
    } catch (error) {
      console.error("Error with fetching signal", error)
    }
  }, [isOn])

  const turnOnSignalStatus = async () => {
    try {
      await api.post("/my-signal/turn-on")
      return true
    } catch (error) {
      console.error("Error turning on my signal:", error)
      return false
    }
  }

  const turnOffSignalStatus = async () => {
    try {
      await api.post("/my-signal/turn-off")
      return false
    } catch (error) {
      console.error("Error turning off my signal:", error)
      return true
    }
  }

  useEffect(() => {
    fetchMySignal()
  }, [fetchMySignal])

  return {
    isOn,
    turnOnSignalStatus,
    turnOffSignalStatus,
    fetchMySignal,
  }
}
