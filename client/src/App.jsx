import React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import SignUp from "./Components/SignUp"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import HomeContainer from "./Components/HomeContainer"
import useCustomContext from "./Context/CustomContext"

const App = () => {
  const { userInfo, darkMode } = useCustomContext()
  const ProtectedRoute = ({ children }) => {
    if (!userInfo) {
      return <Login />
    }

    return children
  }

  return (
    <div
      data-testid="main-container"
      className={`lg:w-[1300px] lg:h-[800px] sm:w-full sm:h-[100vh] bg-white lg:rounded-2xl sm:rounded-none shadow-lg  relative ${
        darkMode && "dark"
      }`}
    >
      <div className="w-full h-full lg:rounded-2xl sm:rounded-none duration-300 dark:bg-slate-700">
        <Navbar />
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomeContainer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
