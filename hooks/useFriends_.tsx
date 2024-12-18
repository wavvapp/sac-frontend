import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { useQuery } from "@tanstack/react-query"

export const useFriends = () => {
  const { isAuthenticated } = useAuth()
  return useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/friends")
        return data
      } catch (error) {
        console.error("Failed to fetch friends:", error)
        return []
      }
    },
    initialData: [],
    enabled: isAuthenticated,
  })
}
