import React from "react"
import { motion } from "framer-motion"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"
import useHomeContainer from "../Hooks/useHomeContainer"

const Chat = () => {
  const { messagesArray, setMessage, sendMessage } = useHomeContainer()

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, type: "spring" },
      }}
      className="w-[70%] h-full"
    >
      <div className="w-full h-[calc(100%-80px)]">
        <div className="w-full h-16 border-b-[1px] border-slate-200 dark-border p-3 flex items-center">
          <h2 className="font-semibold dark:text-white">
            Room: {selectedChat.roomName}
          </h2>
        </div>
        <ScrollToBottom className="w-full h-[calc(100%-64px)]  p-3 flex flex-col">
          {messagesArray?.map((message, i) => (
            <Message message={message} key={i} />
          ))}
        </ScrollToBottom>
      </div>
      <div className="w-full py-3 h-[80px] border-t-[1px] border-slate-200 px-3 dark-border">
        <div className="w-full h-full flex items-center">
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Message..."
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && sendMessage()
            }}
            className="w-full h-full px-3 rounded-lg bg-slate-200 dark:bg-slate-900 outline-none dark:text-white"
          />
          <div
            className="bg-blue-600 ml-2 h-full flex items-center justify-center px-4 rounded-lg cursor-pointer hover:shadow-lg duration-200"
            onClick={sendMessage}
          >
            <i className="fa-solid fa-paper-plane text-white"></i>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Chat
