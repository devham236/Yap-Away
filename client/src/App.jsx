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
      className={`w-[1300px] h-[800px] bg-white rounded-2xl shadow-lg relative ${
        darkMode && "dark"
      }`}
    >
      <div className="w-full h-full rounded-2xl duration-300 dark:bg-slate-700">
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
