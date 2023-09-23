import React from "react"
import me from "../Images/me.png"
import useCustomContext from "../Context/CustomContext"

const Message = ({ message }) => {
  const { userInfo } = useCustomContext()
  return (
    <div
      className={`flex mb-2 ${
        message.author === userInfo.username ? "flex-row-reverse" : ""
      } mb-4 last:mb-0`}
    >
      <div
        className={`w-[55px] h-full rounded-full ${
          message.author === userInfo.username ? "ml-3" : "mr-3"
        }`}
      >
        <img
          src={me}
          alt=""
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <div
        className={`p-2 bg-slate-200 flex flex-col ${
          message.author === userInfo.username ? "items-end" : "items-start"
        } rounded-md max-w-[75%]`}
      >
        <p>{message.content}</p>
        <span className="opacity-50 italic text-xs mt-2">
          {message.timestamp}
        </span>
      </div>
    </div>
  )
}

export default Message
