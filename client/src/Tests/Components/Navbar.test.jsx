import { fireEvent, screen, act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, test, vi } from "vitest"
import Navbar from "./../../Components/Navbar"
import App from "../../App"
import renderWithWrappers from "../Utils/renderWithWrappers"
import useCustomContext from "../../Context/CustomContext"

describe("Navbar", () => {
  describe("Links should navigate to correct forms", () => {
    beforeEach(() => {
      renderWithWrappers(<Navbar />)
    })
    test("Singup form", () => {
      const signupBtn = screen.getByRole("link", { name: /sign up/i })
      fireEvent.click(signupBtn)
      expect(location.pathname).toBe("/signup")
    })

    test("Login form", () => {
      const loginBtn = screen.getByRole("link", { name: /login/i })
      fireEvent.click(loginBtn)
      expect(location.pathname).toBe("/login")
    })
  })

  test("Toggle click should add 'dark' class on app container", () => {
    renderWithWrappers(<App />)
    const toggle = screen.getByTestId(/toggle/i)
    const mainContainer = screen.getByTestId(/main-container/i)
    fireEvent.click(toggle)
    expect(mainContainer).toHaveClass("dark")
  })
})
