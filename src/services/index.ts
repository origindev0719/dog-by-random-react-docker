import { QueryFunctionContext } from "react-query"

const fetchPosts = async () => {
  const apiURL =
    process.env.REACT_APP_API_URL || "https://dog.ceo/api/breeds/list/all"
  const res = await fetch(apiURL)
  return res.json()
}

const fetchImageByBreed = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  const [key, breed] = queryKey

  const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
  return res.json()
}

const fetchAllBreeds = (obj: any, status: string) => {
  if (status === "success" && obj && obj.message) {
    let newObj: any = {}
    for (let key in obj.message) {
      if (obj.message[key] && obj.message[key].length === 0) {
        newObj[key.toUpperCase()] = key
      } else {
        for (
          let i = 0;
          i < (obj.message[key] ? obj.message[key].length : 0);
          i++
        ) {
          let newKey = (obj.message[key][i] + " " + key).toUpperCase()
          newObj[newKey] = key + "-" + obj.message[key][i]
        }
      }
    }
    return newObj
  }
}

export { fetchPosts, fetchAllBreeds, fetchImageByBreed }
