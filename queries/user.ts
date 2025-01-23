import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { useMutation } from "@tanstack/react-query"

export const useDeleteUser = () => {
  const { signOut } = useAuth()

  return useMutation({
    mutationFn: async () => {
      const response = await api.delete("/users")
      return response.data.isDeleted
    },

    onSuccess: async (isDeleted) => {
      if (isDeleted) {
        await signOut()
      }
    },

    onError: (error) => {
      console.error("Error deleting user:", error)
    },
  })
}

export const useUpdateUserInfo = () => {
  const { updateUserInfo } = useAuth()
  return useMutation({
    mutationFn: ({ names }: { names: string }) =>
      api.patch("/users", { names: names }),
    onSuccess: async (_, variables) => {
      await updateUserInfo(variables.names)
    },
    onError: (error) => {
      console.error("Error patching data:", error)
    },
  })
}
