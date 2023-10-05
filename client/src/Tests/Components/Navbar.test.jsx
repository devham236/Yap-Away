import { render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, test } from "vitest"
import { ContextProvider } from "../../Context/Context"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./../../Components/Navbar"

describe("Navbar", () => {
  beforeEach(() => {
    render(
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ContextProvider>
    )
  })
  test("Renders text", () => {
    const textEl = screen.getByText(/^chat$/i)
    expect(textEl).toBeInTheDocument()
  })
})
