import { useQuery } from "react-query"
import { useEffect, useState } from "react"

export const RightSideComponent = () => {
  const { data: selectedBreed }: any = useQuery("selectedBreed", {
    initialData: { value: "" },
    onSuccess: () => {
      setImageURL(selectedBreed?.value)
    },
  })
  const [imageURL, setImageURL] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (selectedBreed?.value) {
      setIsLoading(true)
      setImageURL(selectedBreed?.value)
    } else {
      setIsLoading(false)
    }
  }, [selectedBreed])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="col-span-8 bg-slate-100 shadow-sm rounded-md p-4">
      <div className="flex justify-center items-center h-full">
        <img
          src={`${imageURL}?${new Date().getTime()}`}
          alt={imageURL}
          className="rounded-md w-[400px]"
          onLoad={handleImageLoad}
        />
      </div>
    </div>
  )
}
