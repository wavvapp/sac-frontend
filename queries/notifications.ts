import api from "@/service"
import { useMutation } from "@tanstack/react-query"

export const useRegisterExpoNotificationToken = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      return await api.patch("/users", {
        preferances: { allowNotification: true },
        notificationToken: token,
      })
    },
    onError: (error) => {
      console.error("Error updating user info: ", error)
    },
  })
}
