import api from "@/service"
import { MutationOptions, useMutation } from "@tanstack/react-query"

interface MutationFunctionArguments {
  name: string
  friendIds: string[]
}
export const useCreateGroup = (
  args?: MutationOptions<unknown, unknown, MutationFunctionArguments, unknown>,
) => {
  return useMutation({
    mutationFn: ({ name, friendIds }: MutationFunctionArguments) =>
      api.post("/groups", { name, friend_ids: friendIds }),
    onError: (error) => {
      console.error("Error patching data:", error)
    },
    ...args,
  })
}
