import api from "@/service"
import { Group } from "@/types"
import { MutationOptions, useMutation } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"

interface MutationFunctionArguments {
  name: string
  friendIds: string[]
  groupId?: string
}
export const useCreateGroup = (
  args?: MutationOptions<unknown, unknown, MutationFunctionArguments, unknown>,
) => {
  return useMutation({
    mutationFn: ({ name, friendIds }: MutationFunctionArguments) =>
      api.post("/groups", { name, friendIds }),
    onError: (error) => {
      console.error("Error patching data:", error)
    },
    ...args,
  })
}

export const useGetGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data } = await api.get<Group[]>("/groups")
      return data
    },
    staleTime: Infinity,
    placeholderData: [],
  })
}
export const useUpdateGroup = (
  args?: MutationOptions<unknown, unknown, MutationFunctionArguments, unknown>,
) => {
  return useMutation({
    mutationFn: ({ groupId, name, friendIds }: MutationFunctionArguments) => {
      console.log("====================================")
      console.log({ groupId, name, friendIds })
      console.log("====================================")
      return api.put(`/groups`, { id: groupId, name, friendIds })
    },
    onError: (error) => {
      console.error("Error updating group:", error) // Logs error in case of failure
    },
    onSuccess: (data) => {
      console.log("Group updated successfully:", data)
    },
    ...args, // Spread additional options (if any) passed to the hook
  })
}
