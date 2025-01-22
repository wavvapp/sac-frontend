import api from "@/service"
import { useMutation } from "@tanstack/react-query"

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await api.delete("/users")
      return response.data.isDeleted
    },
    onError: (error) => {
      console.error("Error deleting user:", error)
    },
  })
}
