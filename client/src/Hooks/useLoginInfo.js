import React, { useState } from "react"
import useCustomContext from "../Context/CustomContext"

const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  return { loginInfo, setLoginInfo, error, setError }
}

export default useLoginInfo
