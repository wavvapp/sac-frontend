import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { useMutation } from "@tanstack/react-query"

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
