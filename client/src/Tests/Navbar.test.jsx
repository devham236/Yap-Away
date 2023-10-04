import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Navbar from "./../Components/Navbar"
import { ContextProvider } from "../Context/Context"
import { BrowserRouter } from "react-router-dom"

describe("Navbar", () => {
  test("Renders text", () => {
    render(
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </ContextProvider>
    )
    const textEl = screen.getByText("Chat")
    expect(textEl).toBeInTheDocument()
  })
})
