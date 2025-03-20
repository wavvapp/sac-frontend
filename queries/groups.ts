import api from "@/service"
import { Group } from "@/types"
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"

interface MutationFunctionArguments {
  name: string
  friendIds: string[]
}
export const useCreateGroup = (
  args?: MutationOptions<unknown, unknown, MutationFunctionArguments, unknown>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ name, friendIds }: MutationFunctionArguments) =>
      api.post("/groups", { name, friendIds }),
    onMutate: ({ name, friendIds }) => {
      const previousGroups = queryClient.getQueryData<Group[]>(["groups"]) || []
      const newgroups = [
        ...previousGroups,
        {
          id: "",
          name,
          friends: friendIds,
        },
      ]
      queryClient.setQueryData(["groups"], newgroups)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    },
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

export const useDeleteGroups = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["delete-groups"],
    mutationFn: async (groupId: string) => {
      return api.delete(`/groups/${groupId}`)
    },
    onMutate: (groupId: string) => {
      const previousGroups = queryClient.getQueryData<Group[]>(["groups"]) || []
      const newgroups = previousGroups.filter((group) => group.id !== groupId)
      queryClient.setQueryData(["groups"], newgroups)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    },
  })
}
