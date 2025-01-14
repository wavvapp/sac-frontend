import { useState, useCallback, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import api from "@/service"
import { Friend } from "@/types"

interface PrefetchOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  retryCount?: number
}

interface UsePrefetchResult {
  isPrefetching: boolean
  prefetchError: Error | null
  startPrefetch: (options?: PrefetchOptions) => Promise<void>
  resetPrefetchState: () => void
}

export const usePrefetch = (): UsePrefetchResult => {
  const queryClient = useQueryClient()
  const [isPrefetching, setIsPrefetching] = useState(true)
  const [prefetchError, setPrefetchError] = useState<Error | null>(null)

  const resetPrefetchState = useCallback(() => {
    setIsPrefetching(false)
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

  const startPrefetch = useCallback(
    async (options: PrefetchOptions = {}) => {
      const { onSuccess, onError } = options

      setIsPrefetching(true)
      setPrefetchError(null)

      try {
        await Promise.all(prefetchConfigs.map((fn) => fn()))
        onSuccess?.()
      } catch (error) {
        const finalError =
          error instanceof Error ? error : new Error("Prefetch failed")
        setPrefetchError(finalError)
        onError?.(finalError)
      } finally {
        setIsPrefetching(false)
      }
    },
    [prefetchConfigs],
  )

  return {
    isPrefetching,
    prefetchError,
    startPrefetch,
    resetPrefetchState,
  }
}
