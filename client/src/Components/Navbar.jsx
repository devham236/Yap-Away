import React, { useEffect, useState } from "react"
import { Link, json, useNavigate } from "react-router-dom"
import useCustomContext from "../Context/CustomContext"
import { AnimatePresence, motion } from "framer-motion"
import { sidebarItem } from "../Variants/animationVariants"
import axios from "axios"

const Navbar = () => {
  const {
    userInfo,
    setUserInfo,
    darkMode,
    toggleDarkMode,
    searchResult,
    setSearchResult,
  } = useCustomContext()
  const [opened, setOpened] = useState(true)
  const [otherUsers, setOtherUsers] = useState(false)
  const [chats, setChats] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
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

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await axios.get("/user/list")
        const filteredList = result?.data.usersList.filter(
          (user) => user._id !== userInfo?._id
        )
        setOtherUsers(filteredList)
      } catch (error) {
        console.log(error)
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getChats = async () => {
      const result = await axios.get(
        `/chat/chats?username=${userInfo?.username}`
      )
      setChats(result?.data.chats)
    }
    getChats()
  }, [])

  const createChat = async (user) => {
    try {
      const result = await axios.post("/chat/create", {
        roomName: `${user.username}_and_${userInfo.username}`,
        participants: [userInfo, user],
      })
      setChats((prev) => [...prev, result.data.newChat])
    } catch (error) {
      console.log(error)
    }
  }

  const joinRoom = async (chat) => {
    if (!selectedChat) {
      await socket.emit("joinRoom", chat.roomName)
      setSelectedChat(chat)
    } else {
      console.error("No chats")
    }
  }

  const deleteChat = async (chat, event) => {
    event.stopPropagation()
    try {
      if (chat._id === selectedChat?._id) setSelectedChat(null)
      const result = await axios.delete(`/chat/${chat._id}`)
      setChats(result.data.chats.length === 0 ? null : result.data.chats)
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
          className="flex items-center sm:hidden lg:block"
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

                  <div className="w-full h-16 border-b-[2px] border-slate-200 dark-border flex items-center justify-between ">
                    <input
                      type="text"
                      placeholder="Search for Users..."
                      className="bg-transparent outline-none"
                    />
                    <button className="px-4 py-2 rounded-lg bg-slate-200 font-bold hover:bg-blue-600 dark:bg-slate-900 dark:text-white hover:text-white duration-300 dark-button">
                      Search
                    </button>
                  </div>

                  <motion.div
                    variants={sidebarItem}
                    className="w-full h-[80px] p-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center"
                  >
                    <h1 className="font-bold text-lg dark:text-white">
                      Search <span className="text-blue-600">Results:</span>
                    </h1>
                  </motion.div>
                  {searchResult &&
                    searchResult.map((user) => (
                      <motion.div
                        variants={sidebarItem}
                        key={user._id}
                        className={`w-full h-[80px] p-3 border-b-2 cursor-pointer border-slate-200 flex items-center`}
                      >
                        <div
                          style={{ backgroundColor: user.bgColor }}
                          className={`w-[65px] h-full rounded-full flex items-center justify-center`}
                        >
                          <p
                            style={{ textShadow: "0px 0px 8px #000" }}
                            className="font-semibold text-white text-2xl"
                          >
                            {user.username.charAt(0)}
                          </p>
                        </div>
                        <div className="ml-2 flex w-full items-center justify-between">
                          <div className="">
                            <p className="font-bold">{user.username}</p>
                          </div>
                          <div
                            onClick={() => createChat(user)}
                            className="opacity-50 hover:text-blue-600 hover:border-blue-600 hover:opacity-100 cursor-pointer duration-300 border-[3px] border-slate-200 flex items-center justify-center p-2 rounded-lg"
                          >
                            <i className="fa-solid fa-plus text-md"></i>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  <motion.div
                    variants={sidebarItem}
                    className="w-full h-[80px] p-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center"
                  >
                    <h1 className="font-bold text-lg dark:text-white">
                      Your <span className="text-blue-600">Chats:</span>
                    </h1>
                  </motion.div>
                  <AnimatePresence>
                    {chats &&
                      chats.map((chat) => (
                        <motion.div
                          variants={sidebarItem}
                          exit={{ opacity: 0 }}
                          onClick={() => joinRoom(chat)}
                          key={chat._id}
                          className={`w-full h-[80px] hover:bg-slate-100 dark:hover:bg-slate-900 duration-300 p-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center`}
                        >
                          <div className="w-[70px] h-full relative">
                            {chat.participants.map((p, i) => (
                              <div
                                style={{ backgroundColor: p.bgColor }}
                                key={i}
                                className={`w-[70%] h-[70%] rounded-full flex items-center justify-center absolute ${
                                  p._id === userInfo._id
                                    ? "top-0 left-0"
                                    : "bottom-0 right-0 z-30"
                                }`}
                              >
                                <p
                                  className="font-bold text-2xl text-white"
                                  style={{ textShadow: "0px 0px 8px #000" }}
                                >
                                  {p.username.charAt(0)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <div className="ml-2 flex w-full items-center justify-between">
                            <div className="">
                              <div className="flex">
                                {chat.participants
                                  .filter(
                                    (participant) =>
                                      participant._id !== userInfo._id
                                  )
                                  .map((p, i) => (
                                    <h2
                                      key={i}
                                      className="font-bold mr-2 last:mr-0 dark:text-white"
                                    >
                                      {p.username}
                                    </h2>
                                  ))}
                              </div>
                              <p className="text-sm opacity-50 dark:text-white">
                                Room: {chat.roomName}
                              </p>
                            </div>
                            <div
                              onClick={(event) => deleteChat(chat, event)}
                              className="opacity-50 hover:text-white hover:bg-blue-600 hover:opacity-100 cursor-pointer duration-300 bg-slate-200 px-2 flex items-center justify-center py-2 rounded-full"
                            >
                              <i className="fa-solid fa-trash-can text-md"></i>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                  <motion.div
                    variants={sidebarItem}
                    className="w-full h-[80px] p-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center"
                  >
                    <h1 className="font-bold text-lg dark:text-white">
                      Other <span className="text-blue-600">Users:</span>
                    </h1>
                  </motion.div>
                  {otherUsers &&
                    otherUsers.map((user) => (
                      <motion.div
                        variants={sidebarItem}
                        key={user._id}
                        className={`w-full h-[80px] p-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center`}
                      >
                        <div
                          style={{ backgroundColor: user.bgColor }}
                          className={`w-[65px] h-full rounded-full flex items-center justify-center`}
                        >
                          <p
                            className="font-bold text-2xl text-white"
                            style={{ textShadow: "0px 0px 8px #000" }}
                          >
                            {user.username.charAt(0)}
                          </p>
                        </div>
                        <div className="ml-2 flex w-full items-center justify-between">
                          <div className="">
                            <p className="font-bold dark:text-white">
                              {user.username}
                            </p>
                          </div>
                          {chats?.find((chat) =>
                            chat.roomName.includes(user.username)
                          ) ? (
                            <div
                              onClick={() => createChat(user)}
                              className="cursor-pointer duration-300 border-[3px] border-slate-200 dark:border-slate-400 dark:text-slate-400 flex items-center justify-center p-2 rounded-lg"
                            >
                              <i className="fa-solid fa-check"></i>
                            </div>
                          ) : (
                            <div
                              onClick={() => createChat(user)}
                              className="cursor-pointer border-[3px] border-slate-200 dark:border-slate-400 dark:text-slate-400 flex items-center justify-center p-2 rounded-lg hover:text-blue-600 hover:border-blue-600 dark:hover:border-blue-600 dark:hover:text-blue-600 duration-300"
                            >
                              <i className="fa-solid fa-plus"></i>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
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
