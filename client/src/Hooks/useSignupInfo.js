import React, { useState } from "react"

const useSignupInfo = () => {
  const [signupInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  })
  const [error, setError] = useState(null)

  return { signupInfo, setSignUpInfo, error, setError }
}

export default useSignupInfo
