import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import useHomeContainer from "../Hooks/useHomeContainer"
import { sidebarContainer, sidebarItem } from "../Variants/animationVariants"
import useCustomContext from "../Context/CustomContext"

const Sidebar = () => {
  const { userInfo, setOpened, setSelectedChat } = useCustomContext()
  const {
    setSearchInput,
    setError,
    joinRoom,
    searchUser,
    createChat,
    deleteChat,
    otherUsers,
    searchResult,
    error,
    chats,
  } = useHomeContainer()
  return (
    <div className="lg:w-[30%] lg:block sm:w-full sm:border-r-0 lg:border-r-2 lg:border-slate-200 dark-border max-h-full overflow-auto">
      <div className="w-full h-16 border-b-[2px] border-slate-200 dark-border flex items-center justify-between lg:p-3 sm:p-0">
        <input
          type="text"
          placeholder="Search for Users..."
          className="bg-transparent outline-none"
          onChange={(event) => {
            setSearchInput(event.target.value)
            setError(null)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchUser()
            }
          }}
        />
        <button
          onClick={searchUser}
          className="px-4 py-2 rounded-lg bg-slate-200 font-bold hover:bg-blue-600 dark:bg-slate-900 dark:text-white hover:text-white duration-300 dark-button"
        >
          Search
        </button>
      </div>

      <motion.div
        variants={sidebarContainer}
        exit={{ y: 20, opacity: 0 }}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col"
      >
        <motion.div
          variants={sidebarItem}
          className="w-full h-[80px] lg:p-3 sm:p-0 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center"
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
              className={`w-full h-[80px] lg:p-3 sm:p-0 border-b-2 cursor-pointer border-slate-200 flex items-center`}
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
        {error && (
          <motion.div
            variants={sidebarItem}
            className="w-full h-[80px] duration-300 lg:p-3 sm:p-0 border-b-2 cursor-pointer border-slate-200 flex items-center"
          >
            <p className="italic text-slate-500">{error}...</p>
          </motion.div>
        )}
        <motion.div
          variants={sidebarItem}
          className="w-full h-[80px] lg:p-3 sm:p-0 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center"
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
                className={`w-full h-[80px] hover:bg-slate-100 dark:hover:bg-slate-900 duration-300 lg:p-3 sm:py-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center`}
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
                          (participant) => participant._id !== userInfo._id
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
          className="w-full h-[80px] lg:p-3 sm:p-0 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center"
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
              className={`w-full h-[80px] sm:py-3 lg:p-3 border-b-2 cursor-pointer border-slate-200 dark-border flex items-center`}
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
                  <p className="font-bold dark:text-white">{user.username}</p>
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
      </motion.div>
    </div>
  )
}

export default Sidebar
