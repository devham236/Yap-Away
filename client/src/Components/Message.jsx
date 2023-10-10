import React from "react"
import useCustomContext from "../Context/CustomContext"
import { motion } from "framer-motion"

const Message = ({ message }) => {
  const { userInfo } = useCustomContext()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex mb-2 ${
        message.author === userInfo.username ? "flex-row-reverse" : ""
      } mb-8 last:mb-0`}
    >
      <div
        style={{ backgroundColor: message.bgColor }}
        className={`w-[55px] h-[55px] rounded-full flex items-center justify-center ${
          message.author === userInfo.username ? "ml-3" : "mr-3"
        }`}
      >
        <p
          style={{ textShadow: "0px 0px 8px #000" }}
          className="font-bold text-white text-2xl"
        >
          {message.author.charAt(0)}
        </p>
      </div>
      <div
        className={`p-2 dark:bg-slate-900 bg-slate-200 flex flex-col ${
          message.author === userInfo.username ? "items-end" : "items-start"
        } rounded-md max-w-[75%]`}
      >
        <p className="dark:text-white">{message.content}</p>
        <span className="opacity-50 dark:text-white italic text-xs mt-2">
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  )
}

export default Message
