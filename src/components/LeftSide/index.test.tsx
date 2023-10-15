import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "react-query"
import { LeftSideComponent } from "."
import { fetchPosts, fetchAllBreeds, fetchImageByBreed } from "../../services"
import useSetSelectedBreed from "../../hooks/useSetSelectedBreed"

jest.mock("../../services", () => ({
  fetchPosts: jest.fn(),
  fetchAllBreeds: jest.fn(),
  fetchImageByBreed: jest.fn(),
}))

jest.mock("../../hooks/useSetSelectedBreed", () => ({
  __esModule: true,
  default: jest.fn(),
}))

const queryClient = new QueryClient()

describe("LeftSideComponent", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders without crashing", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LeftSideComponent />
      </QueryClientProvider>
    )
    await waitFor(() => expect(fetchPosts).toHaveBeenCalled())
  })

  it("calls the fetchPosts service on load", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <LeftSideComponent />
      </QueryClientProvider>
    )

    await waitFor(() => expect(fetchPosts).toHaveBeenCalled())
  })

  it("sets the selected breed when a breed is clicked", async () => {
    const mutate = jest.fn()

    ;(useSetSelectedBreed as jest.Mock).mockReturnValue({ mutate })
    ;(fetchAllBreeds as jest.Mock).mockResolvedValue({
      breed1: "Breed 1",
      breed2: "Breed 2",
    })

    render(
      <QueryClientProvider client={queryClient}>
        <LeftSideComponent />
      </QueryClientProvider>
    )

    await waitFor(() => expect(fetchAllBreeds).toHaveBeenCalled())

    const breed1Button = await screen.findByText("breed1")

    fireEvent.click(breed1Button)

    await waitFor(() =>
      expect(mutate).toHaveBeenCalledWith({ key: "breed1", value: "Breed 1" })
    )
  })
})
