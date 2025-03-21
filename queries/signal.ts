import { TemporaryStatusType } from "./../contexts/StatusContext"
import api from "@/service"
import { Friend, Signal } from "@/types"
import {
  useMutation,
  useQuery,
  MutationOptions,
  QueryClient,
} from "@tanstack/react-query"
import { useCallback } from "react"

export const useMySignal = () => {
  return useQuery<Signal, Error>({
    queryKey: ["fetch-my-signal"],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")
      const signal = {
        ...data,
        friendIds: data.friends.map((friend: Friend) => friend?.friendId),
      }
      console.log("refetchedddd")
      return signal
    },
    staleTime: 10000,
  })
}

type UseSaveSatusArgs = MutationOptions & {
  data: TemporaryStatusType
}

export const useSaveStatus = (args: UseSaveSatusArgs) => {
  const { data: temporaryStatus, ...rest } = args
  return useMutation({
    mutationFn: async () => {
      try {
        return api.put("/my-signal", {
          friends: temporaryStatus.friendIds,
          status_message: temporaryStatus.activity,
          when: temporaryStatus.timeSlot,
        })
      } catch (error) {
        console.error("Failed to save status:", error)
      }
    },
    ...rest,
  })
}

export const useTurnOffSignal = (args: MutationOptions) => {
  return useMutation({
    mutationKey: ["toggle-signal-change"],
    mutationFn: () => api.post("/my-signal/turn-off"),
    networkMode: "online",
    ...args,
  })
}

export const usePrefetchSignal = ({
  queryClient,
}: {
  queryClient: QueryClient
}) => {
  return useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ["fetch-my-signal"],
      queryFn: async () => {
        const { data } = await api.get("/my-signal")
        const signal = {
          ...data,
          friendIds: data.friends.map((friend: Friend) => friend?.friendId),
        }
        return signal
      },
    })
  }, [queryClient])
}
