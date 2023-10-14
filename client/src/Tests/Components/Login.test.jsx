import { beforeEach, describe, expect, vi } from "vitest"
import { fireEvent, screen, renderHook, act } from "@testing-library/react"
import { ContextProvider } from "../../Context/Context"
import renderWithWrappers from "../Utils/renderWithWrappers"
import Login from "../../Components/Login"
import axios from "axios"
import App from "../../App"
import useCustomContext from "../../Context/CustomContext"
import useLoginInfo from "../../Hooks/useLoginInfo"
import mockResponseData from "../Utils/mockResponseData"

vi.mock("axios")

describe("Login Form", () => {
  describe("loginInfo state updates correctly when changed", () => {
    beforeEach(() => {
      renderWithWrappers(<Login />)
    })
    test("Email loginInfo", async () => {
      const { result } = renderHook(() => useLoginInfo())
      act(() => {
        result.current.setLoginInfo({
          ...result.current.loginInfo,
          email: "test@email.com",
        })
      })
      expect(result.current.loginInfo.email).toBe("test@email.com")
    })
    test("Password loginInfo", () => {
      const { result } = renderHook(useLoginInfo)
      act(() => {
        result.current.setLoginInfo({
          ...result.current.loginInfo,
          password: "123",
        })
      })
      expect(result.current.loginInfo.password).toBe("123")
    })
  })

  describe("Login Functionality", () => {
    test("User gets logged in when button gets clicked", async () => {
      renderWithWrappers(<App />)

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
