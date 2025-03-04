import { fetchPoints } from "@/libs/fetchPoints"
import { QueryOptions, useQuery } from "@tanstack/react-query"

export const useFetchPoints = (args?: QueryOptions) => {
  return useQuery({
    queryKey: ["points"],
    queryFn: () => fetchPoints(),
    ...args,
  })
}
