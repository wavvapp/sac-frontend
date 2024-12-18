import api from "@/service"
import { useQuery } from "@tanstack/react-query"

export const useFriends = () => {
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
  })
}
