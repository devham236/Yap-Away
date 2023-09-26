import axios from "axios"
import React, { createContext, useEffect, useState } from "react"

const Context = createContext()

const ContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [userImage, setUserImage] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"))

    const verifyUser = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3000/api/v1/user/verify",
          {
            token,
          }
        )
        setUserInfo(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    verifyUser()
  }, [])

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
