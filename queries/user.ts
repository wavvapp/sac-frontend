import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"

export const useUpdateUserInfo = () => {
  const { updateUserProfile } = useAuth()
  return useMutation({
    mutationFn: ({ names }: { names: string }) =>
      api.patch("/users", { names: names }),
    onSuccess: async (_, variables) => {
      await AsyncStorage.setItem("@Auth:names", variables.names)
      updateUserProfile(variables.names)
    },
    onError: (error) => {
      console.error("Error patching data:", error)
    },
  })
}
