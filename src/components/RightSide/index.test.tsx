import { render, screen, waitFor, act } from "@testing-library/react"
import { QueryClient, QueryClientProvider, Hydrate } from "react-query"
import { RightSideComponent } from "."

const queryClient = new QueryClient()

describe("RightSideComponent", () => {
  it("renders the image with the correct URL", async () => {
    const selectedBreed = { value: "https://example.com/image.jpg" }

    act(() => {
      queryClient.setQueryData("selectedBreed", selectedBreed)
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Hydrate state={queryClient.getQueryCache().getAll()}>
          <RightSideComponent />
        </Hydrate>
      </QueryClientProvider>
    )

    const image = (await waitFor(() =>
      screen.findByAltText(selectedBreed.value)
    )) as HTMLImageElement

    expect(image).toBeInTheDocument()
    expect(image.src).toContain(selectedBreed.value)
  })

  it("does not render an image if there is no selected breed", () => {
    act(() => {
      queryClient.setQueryData("selectedBreed", null)
    })

    render(
      <QueryClientProvider client={queryClient}>
        <RightSideComponent />
      </QueryClientProvider>
    )

    const image = screen.queryByAltText(
      "https://example.com/image.jpg"
    ) as HTMLImageElement
    expect(image).toBeNull()
  })
})
