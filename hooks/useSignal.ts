import api from "@/service"
import { Friend, Signal } from "@/types"
import { useSharedValue } from "react-native-reanimated"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useSignal = () => {
  const isOn = useSharedValue(false)
  const queryClient = useQueryClient()

  const {
    data: signal,
    isLoading,
    isError,
  } = useQuery<Signal>({
    queryKey: ["my-signal"],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")

      isOn.value = data.status === "active"

      const friendIds = data.friends.map((friend: Friend) => friend.friendId)

      return { ...data, friends: friendIds }
    },
    staleTime: 5 * 60 * 1000,
  })
  const turnOnSignalStatus = useMutation({
    mutationFn: () => api.post("/my-signal/turn-on"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["my-signal"] })
      const previousSignal = queryClient.getQueryData<Signal>(["my-signal"])
      queryClient.setQueryData<Signal>(["my-signal"], (old) => ({
        ...old!,
        status: "active",
      }))

      isOn.value = true

      return { previousSignal }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["my-signal"], context?.previousSignal)
      isOn.value = false
      console.error("Error turning on signal:", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-signal"] })
    },
  })

  const turnOffSignalStatus = useMutation({
    mutationFn: () => api.post("/my-signal/turn-off"),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["my-signal"] })

      const previousSignal = queryClient.getQueryData<Signal>(["my-signal"])
      queryClient.setQueryData<Signal>(["my-signal"], (old) => ({
        ...old!,
        status: "inactive",
      }))
      isOn.value = false
      return { previousSignal }
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["my-signal"], context?.previousSignal)
      isOn.value = true
      console.error("Error turning off signal:", error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["my-signal"] })
    },
  })

  return {
    signal,
    isOn,
    isLoading,
    isError,
    turnOnSignalStatus,
    turnOffSignalStatus,
  }
}
