import { fetchPosts, fetchAllBreeds, fetchImageByBreed } from "."
import { act } from "react-dom/test-utils"

const mockFetch = (data: any) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  }) as Promise<Response>

describe("fetchPosts", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => mockFetch({ message: "data" }))
  })

  it("fetches posts correctly", async () => {
    const data = await fetchPosts()
    expect(data).toEqual({ message: "data" })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("https://dog.ceo/api/breeds/list/all")
  })
})

describe("fetchImageByBreed", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => mockFetch({ message: "data" }))
  })

  it("fetches image by breed correctly", async () => {
    const data = await fetchImageByBreed({
      queryKey: ["key", "breed"],
      meta: {},
    })
    expect(data).toEqual({ message: "data" })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      "https://dog.ceo/api/breed/breed/images/random"
    )
  })
})

describe("fetchAllBreeds", () => {
  beforeEach(() => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => mockFetch({ message: "data" }))
  })

  it("fetches posts correctly", async () => {
    let data
    await act(async () => {
      data = await fetchPosts()
    })

    expect(data).toEqual({ message: "data" })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("https://dog.ceo/api/breeds/list/all")
  })
})
