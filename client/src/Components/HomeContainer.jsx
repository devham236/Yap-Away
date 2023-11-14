import React from "react"
import useHomeContainer from "../Hooks/useHomeContainer"
import Sidebar from "./Sidebar"
import Chat from "./Chat"

const HomeContainer = () => {
  const { selectedChat } = useHomeContainer()

  console.log(selectedChat)

  return (
    <div className="w-full h-[calc(100%-80px)] rounded-b-2xl flex">
      <Sidebar />
      {selectedChat ? (
        <Chat />
      ) : (
        <div className="lg:w-[70%] sm:w-full sm:px-3 lg:px-0 h-full flex items-center justify-center">
          <div className="dark:bg-slate-900 w-[500px] h-[300px] bg-slate-200 rounded-lg flex items-center justify-center">
            <h1 className="font-bold text-lg dark:text-white">
              Select a chat to start texting.
            </h1>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeContainer
