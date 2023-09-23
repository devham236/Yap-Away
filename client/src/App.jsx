import React from "react"
import { Routes, Route } from "react-router-dom"
import SignUp from "./Components/SignUp"
import Navbar from "./Components/Navbar"
import Login from "./Components/Login"
import HomeContainer from "./Components/HomeContainer"
import useCustomContext from "./Context/CustomContext"

const App = () => {
  const { userInfo, selectedUser, selectedId, setSelectedId } =
    useCustomContext()

  const ProtectedRoute = ({ children }) => {
    if (!userInfo) {
      return <Login />
    }

    return children
  }

  return (
    <div className="w-[1300px] h-[800px] bg-white rounded-2xl shadow-lg relative">
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
      {/* <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            className="fixed inset-0 bg-red-300 w-[800px] h-[500px]"
          >
            <motion.h5>{}</motion.h5>
            <motion.h2>{}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  )
}

export default App
