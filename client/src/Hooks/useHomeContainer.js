import React, { useEffect, useState } from "react"
import axios from "./../Config/axiosConfig"
import useCustomContext from "../Context/CustomContext"
import io from "socket.io-client"

const socket = io.connect("http://localhost:3000")

const useHomeContainer = () => {
  const { userInfo, selectedChat, setSelectedChat } = useCustomContext()
  const [chats, setChats] = useState(null)
  const [otherUsers, setOtherUsers] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState("")
  const [message, setMessage] = useState("")
  const [messagesArray, setMessagesArray] = useState([])

  useEffect(() => {
    const getChats = async () => {
      const result = await axios.get(
        `/chat/chats?username=${userInfo?.username}`
      )
      setChats(result?.data.chats)
    }
    getChats()
  }, [])

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessagesArray((prev) => [...prev, data])
    })
  }, [socket])

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

  const searchUser = async () => {
    if (searchInput !== "") {
      try {
        const result = await axios.get(`/user/users?search=${searchInput}`)
        const filteredList = result.data.users.filter(
          (user) => user._id !== userInfo._id
        )
        setSearchResult(filteredList)
      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
  }

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

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room: selectedChat.roomName,
        author: userInfo.username,
        bgColor: userInfo.bgColor,
        content: message,
        timestamp:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit("sendMessage", messageData)
      const result = await axios.post("/chat/sendMessage", { messageData })
      setMessagesArray(result.data.chat.messages)
      setMessage("")
    }
  }

  const joinRoom = async (chat) => {
    if (!selectedChat) {
      await socket.emit("joinRoom", chat.roomName)
    } else {
      console.error("No chats")
    }
  }

  return {
    chats,
    searchInput,
    messagesArray,
    message,
    otherUsers,
    error,
    searchResult,
    joinRoom,
    setMessagesArray,
    setMessage,
    setSearchInput,
    searchUser,
    sendMessage,
    setChats,
    setError,
    createChat,
    setOtherUsers,
    setSearchResult,
    deleteChat,
  }
}

export default useHomeContainer
