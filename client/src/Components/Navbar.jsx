import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCustomContext from "../Context/CustomContext"
import { AnimatePresence, motion } from "framer-motion"
import Sidebar from "./Sidebar"

const Navbar = () => {
  const { userInfo, setUserInfo, darkMode, toggleDarkMode, opened, setOpened } =
    useCustomContext()
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
    <div className="w-full h-20 p-3 lg:rounded-tr-2xl lg:rounded-tl-2xl border-b-2 border-slate-200 dark-border relative">
      <div className="w-full h-full flex items-center justify-between">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex h-full items-center justify-between"
        >
          <Link
            to="/"
            data-testid="home-link"
            className="sm:hidden lg:block w-[55px] mr-2 h-full bg-slate-200 rounded-full flex items-center justify-center cursor-pointer"
          >
            {userInfo ? (
              <div
                style={{ backgroundColor: userInfo?.bgColor }}
                className={`w-full h-full rounded-full flex items-center justify-center`}
              >
                <p
                  style={{ textShadow: "0px 0px 10px #000" }}
                  className="text-2xl text-white font-bold"
                >
                  {userInfo?.username.charAt(0)}
                </p>
              </div>
            ) : (
              <img
                src={
                  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt="anonymous avatar icon"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </Link>
          {userInfo && (
            <div className="lg:mx-2 sm:mx-0">
              <p className="font-bold dark:text-white lg:block sm:hidden">
                {userInfo.username}
              </p>
            </div>
          )}
          <div
            onClick={toggleDarkMode}
            data-testid="toggle"
            className={`lg:w-[70px] sm:w-[60px] lg:h-[40px] sm:h-[35px] flex items-center ${
              darkMode ? "justify-start" : "justify-end"
            } p-[5px] lg:ml-2 sm:ml-0 rounded-full bg-slate-300 dark:bg-slate-900 cursor-pointer`}
          >
            <motion.div
              layout
              transition={spring}
              className="w-1/2 h-full bg-white rounded-full"
            ></motion.div>
          </div>
        </motion.div>
        <h1 className="font-bold text-2xl dark:text-white">
          Chat <span className="text-blue-600">Away.</span>
        </h1>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          className="lg:flex items-center sm:hidden"
        >
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
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => {
            setOpened(!opened)
          }}
          className="p-3 rounded-lg bg-slate-300 dark:bg-slate-900 lg:hidden sm:flex items-center justify-center"
        >
          <i
            className={`fa-solid fa-${
              opened ? "xmark" : "bars"
            } dark:text-white`}
          ></i>
        </motion.div>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute z-50 top-20 left-0 w-full h-[calc(100vh-80px)] overflow-auto bg-white flex flex-col items-center p-4 justify-start dark:bg-slate-700"
            >
              {userInfo ? (
                <div className="w-full max-h-full">
                  <div className=" w-full flex items-center justify-between mb-4 py-2">
                    <div className="w-[55px] h-[55px] rounded-full flex items-center justify-between">
                      <div
                        style={{ backgroundColor: userInfo?.bgColor }}
                        className="w-full h-full rounded-full flex items-center justify-center"
                      >
                        <p
                          style={{ textShadow: "0px 0px 10px #000" }}
                          className="text-2xl text-white font-bold"
                        >
                          {userInfo?.username.charAt(0)}
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl dark:text-white font-bold">
                      {userInfo?.username}
                    </p>
                    <button
                      onClick={logout}
                      className="lg:mr-2 sm:flex sm:items-center sm:justify-center dark:bg-slate-900 dark-button dark:text-white bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
                    >
                      <p className="font-semibold">Logout</p>
                    </button>
                  </div>

                  <Sidebar />
                </div>
              ) : (
                <>
                  <Link
                    className="lg:mr-2 sm:mb-4 sm:flex sm:items-center sm:justify-center sm:w-full dark:bg-slate-900 dark-button dark:text-white bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
                    to="/signup"
                    onClick={() => setOpened(false)}
                  >
                    <p className="font-semibold">Sign Up</p>
                  </Link>
                  <Link
                    className="lg:ml-2 sm:w-full sm:flex sm:items-center sm:justify-center dark:bg-slate-900 dark-button dark:text-white bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
                    to="/login"
                    onClick={() => setOpened(false)}
                  >
                    <p className="font-semibold">Login</p>
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar
