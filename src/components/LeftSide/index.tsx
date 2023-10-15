import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { fetchPosts, fetchAllBreeds, fetchImageByBreed } from "../../services"
import useSetSelectedBreed from "../../hooks/useSetSelectedBreed"

export const LeftSideComponent = () => {
  const { data, status } = useQuery("posts", fetchPosts)
  const [breed, setBreed] = useState(null)
  const [selectedBreed, setSelectedBreedName] = useState(null)
  const setSelectedBreed = useSetSelectedBreed()

  const [clickCount, setClickCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectBreed = (key: string, value: any) => {
    setSelectedBreedName(value)
    setClickCount((prevCount) => prevCount + 1)
  }

  const { refetch } = useQuery(
    ["randomBreed", selectedBreed ? selectedBreed : "affenpinscher"],
    fetchImageByBreed,
    {
      enabled: false,
    }
  )

  useEffect(() => {
    if (selectedBreed || clickCount > 0) {
      setIsLoading(true)
      refetch().then((newBreedJson) => {
        const newBreed = newBreedJson?.data?.message
        setSelectedBreed.mutate({ key: selectedBreed, value: newBreed })
        setIsLoading(false)
      })
    }
  }, [selectedBreed, clickCount])

  useEffect(() => {
    const loadBreeds = async () => {
      if (!breed) {
        const entireBreeds = await fetchAllBreeds(data, status)
        if (entireBreeds) {
          setBreed(entireBreeds)
          const initialSelectedBreedKey = Object.keys(entireBreeds)[0]
          const initialSelectedBreedValue =
            entireBreeds[initialSelectedBreedKey]
          setSelectedBreed.mutate({
            value: initialSelectedBreedValue,
            key: initialSelectedBreedKey,
          })
          setSelectedBreedName(initialSelectedBreedValue)
        }
      }
    }

    loadBreeds()
  }, [data, status, setSelectedBreed, breed])

  return (
    <div className="col-span-4 p-4 max-h-[75vh] overflow-y-scroll bg-slate-100 rounded-md shadow-sm">
      <div className="py-3 px-2 my-3 border-b-2 border-white text-xl font-bold">
        Dog Breeds
      </div>
      {breed &&
        Object.entries(breed).map(([key, value], index) => (
          <div
            key={index}
            className={`py-2 px-2 rounded-sm hover:bg-gray-200 font-mono  cursor-pointer ${
              value === selectedBreed
                ? "bg-gray-900 text-white hover:text-gray-100 hover:bg-slate-900"
                : "hover:text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => handleSelectBreed(key, value)}
          >
            {key}
          </div>
        ))}
    </div>
  )
}
