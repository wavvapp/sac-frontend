import api from "@/service"
import { useCallback, useEffect } from "react"
import { useSharedValue } from "react-native-reanimated"

export const useSignal = () => {
  const isOn = useSharedValue(false)

  const fetchMySignal = useCallback(async () => {
    try {
      const { data } = await api.get("/my-signal")
      isOn.value = data.status === "active"
    } catch (error) {}
  }, [isOn])

  const turnOnSignalStatus = async () => {
    try {
      await api.post("/my-signal/turn-on")
      isOn.value = true
    } catch (error) {
      console.error("Error turning on my signal:", error)
      isOn.value = false
    }
  }

  const turnOffSignalStatus = async () => {
    try {
      await api.post("/my-signal/turn-off")
      isOn.value = false
    } catch (error) {
      console.error("Error turning off my signal:", error)
      isOn.value = true
    }
  }
  useEffect(() => {
    fetchMySignal()
  }, [fetchMySignal])

  return {
    isOn,
    turnOnSignalStatus,
    turnOffSignalStatus,
  }
}
