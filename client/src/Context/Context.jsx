import axios from "../Config/axiosConfig"
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
          "/user/verify",
          {
            token,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "true",
            },
          }
        )
        setUserInfo(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    verifyUser()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const checkErrorMsg = (errorMessage, inputName) => {
    const includesInputName = errorMessage?.includes(inputName)
    return includesInputName
  }

  return (
    <Context.Provider
      value={{
        userInfo,
        setUserInfo,
        checkErrorMsg,
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
