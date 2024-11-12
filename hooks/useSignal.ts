import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { Signal } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { useSharedValue } from "react-native-reanimated"

export const useSignal = () => {
  const isOn = useSharedValue(false)
  const { updateUserInfo } = useAuth()
  const [signal, setSignal] = useState<Signal | null>(null)

  const fetchMySignal = useCallback(async () => {
    try {
      const { data } = await api.get("/my-signal")
      setSignal(data)
      isOn.value = data.status === "active"
      await updateUserInfo(data.status_message, data.when)
    } catch (error) {
      console.log("Error with fetching signal", error)
    }
  }, [isOn])

  const turnOnSignalStatus = async () => {
    try {
      isOn.value = true
      await api.post("/my-signal/turn-on")
    } catch (error) {
      console.error("Error turning on my signal:", error)
      isOn.value = false
    }
  }

  const turnOffSignalStatus = async () => {
    try {
      isOn.value = false
      await api.post("/my-signal/turn-off")
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
    fetchMySignal,
    signal,
  }
}
