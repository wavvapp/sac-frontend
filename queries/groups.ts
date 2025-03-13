import api from "@/service"
import { useQuery } from "@tanstack/react-query"

export const useGetGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get("/groups")
      console.log(data)
      return data
    },
    staleTime: Infinity,
    refetchInterval: 5000,
    placeholderData: [],
  })
}
