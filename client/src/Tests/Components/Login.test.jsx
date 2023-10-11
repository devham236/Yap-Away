import { beforeEach, describe, expect, vi } from "vitest"
import renderWithWrappers from "../Utils/renderWithWrappers"
import Login from "../../Components/Login"
import { fireEvent, screen } from "@testing-library/react"
import axios from "axios"
import App from "../../App"

vi.mock("axios")

describe("Login Form", () => {
  describe("Input value should change when typed in", () => {
    beforeEach(() => {
      renderWithWrappers(<Login />)
    })
    test("Email input", () => {
      const emailInput = screen.getByPlaceholderText("E-Mail")
      fireEvent.change(emailInput, { target: { value: "test@email.com" } })
      expect(emailInput.value).toBe("test@email.com")
    })
    test("Password input", () => {
      const passwordInput = screen.getByPlaceholderText("Password")
      fireEvent.change(passwordInput, { target: { value: "123" } })
      expect(passwordInput.value).toBe("123")
    })
  })

  test("User gets logged in when button gets clicked", async () => {
    renderWithWrappers(<App />)
    const mockResponseData = {
      username: "mockUsername",
      email: "mockEmail",
      _id: "mockId",
      token: "mockToken",
      image: "mockImage",
    }

    axios.post.mockResolvedValue({ data: mockResponseData })

    const loginBtn = screen.getByTestId("loginBtn")
    fireEvent.click(loginBtn)
    const username = await screen.findByText("mockUsername")
    expect(username).toBeInTheDocument()
  })
})
