import api from "@/service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete("/users")
      return response.data.isDeleted
    },

    onSuccess: async (isDeleted) => {
      if (isDeleted) {
        await AsyncStorage.removeItem("@Auth:user")
        queryClient.clear()
      }
    },

    onError: (error) => {
      console.error("Error deleting user:", error)
    },
  })
}
