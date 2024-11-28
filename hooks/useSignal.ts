import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { useCallback, useEffect } from "react"
import { useSharedValue } from "react-native-reanimated"

export const useSignal = () => {
  const isOn = useSharedValue(false)
  const { updateUserInfo } = useAuth()

  const fetchMySignal = useCallback(async () => {
    try {
      const { data } = await api.get("/my-signal")
      isOn.value = data.status === "active"
      await updateUserInfo(data.status_message, data.when)
      return data
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
