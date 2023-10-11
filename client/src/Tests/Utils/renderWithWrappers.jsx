import { BrowserRouter } from "react-router-dom"
import { ContextProvider } from "../../Context/Context"
import { render } from "@testing-library/react"

const renderWithWrappers = (component) => {
  render(
    <ContextProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </ContextProvider>
  )
}

export default renderWithWrappers
