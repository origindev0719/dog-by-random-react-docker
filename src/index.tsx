import React from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import "./index.css"
import { HomePage } from "./pages"
import reportWebVitals from "./reportWebVitals"
const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <HomePage />
  </QueryClientProvider>,
  document.getElementById("root")
)

reportWebVitals()
