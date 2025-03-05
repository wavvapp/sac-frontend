import { useAuth } from "@/contexts/AuthContext"
import api from "@/service"
import { User } from "@/types"
import { QueryOptions, useMutation, useQuery } from "@tanstack/react-query"

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

export const useSearchFriend = (
  args: QueryOptions<User[]> & { searchQueryText: string },
) => {
  const { searchQueryText, ...rest } = args
  return useQuery<User[]>({
    queryKey: ["users", searchQueryText],
    enabled: searchQueryText.trim().length > 0,
    queryFn: async () => {
      const response = await api.get(`/users?q=${searchQueryText}`)
      return response.data.map((user: User) => ({
        id: user.id,
        names: user.names,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl,
        isFriend: user.isFriend,
      }))
    },
    networkMode: "offlineFirst",
    ...rest,
  })
}
