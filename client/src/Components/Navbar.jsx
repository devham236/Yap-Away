import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCustomContext from "../Context/CustomContext"
import { motion } from "framer-motion"

const Navbar = () => {
  const { userInfo, setUserInfo, darkMode, setDarkMode } = useCustomContext()
  const navigate = useNavigate()

  const logout = () => {
    try {
      sessionStorage.removeItem("token")
      setUserInfo(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  }

  return (
    <div className="w-full h-20 p-3 rounded-tr-2xl rounded-tl-2xl border-b-2 border-slate-200 dark-border">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex h-full items-center justify-between">
          <Link
            to="/"
            className="w-[55px] mr-2 h-full bg-slate-200 rounded-full flex items-center justify-center cursor-pointer"
          >
            {userInfo ? (
              <div
                style={{ backgroundColor: userInfo?.bgColor }}
                className={`w-full h-full rounded-full flex items-center justify-center`}
              >
                <p
                  style={{ textShadow: "0px 0px 8px #000" }}
                  className="font-bold text-white text-2xl"
                >
                  {userInfo.username.charAt(0)}
                </p>
              </div>
            ) : (
              <img
                src={
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </Link>
          <div
            onClick={() => setDarkMode(!darkMode)}
            className={`w-[70px] h-[40px] flex items-center ${
              darkMode ? "justify-start" : "justify-end"
            } p-[5px] ml-2 rounded-full bg-slate-300 dark:bg-slate-900 cursor-pointer`}
          >
            <motion.div
              layout
              transition={spring}
              className="w-1/2 h-full bg-white rounded-full"
            ></motion.div>
          </div>
        </div>
        <h1 className="font-bold text-2xl dark:text-white">
          Chat <span className="text-blue-600">Away.</span>
        </h1>
        <div className="flex items-center">
          {userInfo ? (
            <button
              className="bg-slate-200 dark:bg-slate-900 dark:text-white p-3 rounded-lg duration-300 hover:bg-blue-600 dark-button hover:text-white"
              onClick={logout}
            >
              <p className="font-semibold">Logout</p>
            </button>
          ) : (
            <>
              <Link
                className="mr-2 dark:bg-slate-900 dark-button dark:text-white bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
                to="/signup"
              >
                <p className="font-semibold">Sign Up</p>
              </Link>
              <Link
                className="ml-2 dark:bg-slate-900 dark-button dark:text-white bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
                to="/login"
              >
                <p className="font-semibold">Login</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
