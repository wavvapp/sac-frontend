import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { useQuery } from "@tanstack/react-query"

export const useFetchMySignal = () => {
  const { isAuthenticated } = useAuth()
  return useQuery({
    queryKey: ["fetch-my-signal"],
    queryFn: async () => {
      const { data } = await api.get("/my-signal")
      return data
    },
    enabled: isAuthenticated,
  })
}
