import React, { useContext } from "react"
import { Context } from "./Context"

const useCustomContext = () => {
  const context = useContext(Context)

  return context
}

export default useCustomContext
