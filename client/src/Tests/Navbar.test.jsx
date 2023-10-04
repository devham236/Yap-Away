import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Navbar from "./../Components/Navbar"

describe("Navbar", () => {
  test("Renders text", () => {
    render(<Navbar />)
    const textEl = screen.getByText("Chat")
    expect(textEl).toBeInTheDocument()
  })
})
