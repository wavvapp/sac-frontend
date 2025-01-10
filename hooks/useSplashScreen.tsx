import { useState, useCallback, useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"
import api from "@/service"

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
  const [isPrefetching, setIsPrefetching] = useState(false)
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

  const prefetchConfigs = useMemo(() => {
    return [prefetchUsers]
  }, [prefetchUsers])

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
