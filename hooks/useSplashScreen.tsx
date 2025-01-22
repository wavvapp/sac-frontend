import { useState, useCallback, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import api from "@/service"
import { Friend } from "@/types"
import * as SplashScreen from "expo-splash-screen"

interface PrefetchOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  retryCount?: number
}

interface UsePrefetchResult {
  prefetchError: Error | null
  startPrefetch: (options?: PrefetchOptions) => Promise<void>
  resetPrefetchState: () => void
}

export const usePrefetch = (): UsePrefetchResult => {
  const queryClient = useQueryClient()
  const [prefetchError, setPrefetchError] = useState<Error | null>(null)

  const resetPrefetchState = useCallback(() => {
    setPrefetchError(null)
  }, [])

  const prefetchUsers = useCallback(async () => {
    await queryClient.prefetchQuery({
      queryKey: ["friends"],
      queryFn: async () => {
        const { data } = await api.get("/friends")
        return data
      },
    })
  }, [queryClient])

  const prefetchSignal = useCallback(async () => {
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

  const prefetchConfigs = useMemo(() => {
    return [prefetchUsers, prefetchSignal]
  }, [prefetchSignal, prefetchUsers])

  const startPrefetch = useCallback(async () => {
    setPrefetchError(null)
    try {
      await Promise.all(prefetchConfigs.map((fn) => fn()))
    } catch (error) {
      const finalError =
        error instanceof Error ? error : new Error("Prefetch failed")
      setPrefetchError(finalError)
    } finally {
      await SplashScreen.hideAsync()
    }
  }, [prefetchConfigs])

  return {
    prefetchError,
    startPrefetch,
    resetPrefetchState,
  }
}
