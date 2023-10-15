import { useMutation, useQueryClient } from "react-query"

const setSelectedBreedMutation = async (selectedBreed: any) => {
  return selectedBreed
}

const useSetSelectedBreed = () => {
  const queryClient = useQueryClient()

  return useMutation(setSelectedBreedMutation, {
    onSuccess: (data) => {
      queryClient.setQueryData("selectedBreed", data)
    },
  })
}

export default useSetSelectedBreed
