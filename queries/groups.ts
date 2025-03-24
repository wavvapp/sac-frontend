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
  groupId?: string
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
export const useUpdateGroup = (
  args?: MutationOptions<
    unknown,
    unknown,
    MutationFunctionArguments,
    { previousGroup: Group | undefined }
  >,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ groupId, name, friendIds }: MutationFunctionArguments) =>
      api.put(`/groups/${groupId}`, { name, friendIds }),
    onMutate: async (args: MutationFunctionArguments) => {
      const { groupId, name, friendIds } = args
      await queryClient.cancelQueries({ queryKey: ["groups", groupId] })
      const previousGroup = queryClient.getQueryData<Group>(["groups", groupId])
      queryClient.setQueryData(["groups", groupId], (old: Group) => ({
        ...old,
        name,
        friendIds,
      }))
      queryClient.setQueryData(["groups"], (oldGroups: any[]) => {
        if (!oldGroups) return oldGroups
        return oldGroups.map((group) =>
          group.id === groupId ? { ...group, name, friendIds } : group,
        )
      })
      return { previousGroup }
    },
    onError: (error, variables, context) => {
      console.error("Error updating group:", error)
      if (context?.previousGroup) {
        queryClient.setQueryData(
          ["groups", variables.groupId],
          context.previousGroup,
        )
      }
    },
    onSettled: (data, error, variables: MutationFunctionArguments) => {
      queryClient.invalidateQueries({ queryKey: ["groups", variables.groupId] })
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    },
    ...args,
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
