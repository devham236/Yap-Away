import { beforeEach, describe, expect, vi } from "vitest"
import { fireEvent, screen, renderHook, act } from "@testing-library/react"
import { ContextProvider } from "../../Context/Context"
import renderWithWrappers from "../Utils/renderWithWrappers"
import Login from "../../Components/Login"
import axios from "axios"
import App from "../../App"
import useCustomContext from "../../Context/CustomContext"
import mockResponseData from "../Utils/mockResponseData"

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

  describe("Login Functionality", () => {
    test("User gets logged in when button gets clicked", async () => {
      renderWithWrappers(<Login />)

      axios.post.mockResolvedValue({ data: mockResponseData })

      const loginBtn = screen.getByTestId("loginBtn")
      fireEvent.click(loginBtn)
      const username = await screen.findByText(mockResponseData.username)
      expect(username).toBeInTheDocument()
    })

    test("userInfo state contains an object with user info when user logs in", () => {
      const { result } = renderHook(() => useCustomContext(), {
        wrapper: ContextProvider,
      })

      act(() => {
        result.current.setUserInfo(mockResponseData)
      })

      expect(result.current.userInfo).not.toBe(null)
    })
  })
})
