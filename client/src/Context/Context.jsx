import axios from "../Config/axiosConfig"
import React, { createContext, useEffect, useState } from "react"

const Context = createContext()

const ContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"))

    const verifyUser = async () => {
      try {
        const result = await axios.post("/user/verify", {
          token,
        })
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
        darkMode,
        selectedChat,
        opened,
        setOpened,
        setSelectedChat,
        setUserInfo,
        checkErrorMsg,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
