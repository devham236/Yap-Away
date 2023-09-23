import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"

const Context = createContext()

const ContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)

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
        setUserInfo(result.data._doc)
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
      }}
    >
      {children}
    </Context.Provider>
  )
}

export { ContextProvider, Context }
