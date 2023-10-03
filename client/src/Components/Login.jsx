import axios from "axios"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useCustomContext from "../Context/CustomContext"
import { motion } from "framer-motion"
import { formContainer, formItem } from "../Variants/animationVariants"

const Login = () => {
  const { setUserInfo } = useCustomContext()
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setError("")
    setLoginInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const login = async (event) => {
    event.preventDefault()
    try {
      const result = await axios.post("/user/login", loginInfo)
      sessionStorage.setItem("token", JSON.stringify(result.data.token))
      setUserInfo(result.data)
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="w-full duration-300 h-full flex items-center">
      <motion.form
        variants={formContainer}
        initial="hidden"
        animate="visible"
        className="w-96 mx-auto p-14 bg-slate-300 dark:bg-slate-900 dark:border-0 rounded-xl"
      >
        <motion.div
          variants={formItem}
          className="flex flex-col items-center justify mb-6"
        >
          <h1 className="font-bold dark:text-white text-2xl text-center">
            Login
          </h1>
        </motion.div>
        <motion.input
          variants={formItem}
          type="email"
          name="email"
          placeholder="E-Mail"
          className="block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none"
          onChange={handleChange}
        />
        <motion.input
          variants={formItem}
          type="password"
          name="password"
          placeholder="Password"
          className="block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none"
          onChange={handleChange}
        />
        <motion.button
          variants={formItem}
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:shadow-xl duration-300 mb-6"
          onClick={login}
        >
          Login
        </motion.button>
        <motion.p
          variants={formItem}
          className="text-sm text-center dark:text-white"
        >
          New to ChatAway?
          <Link
            to="/signup"
            className="text-blue-600 ml-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300"
          >
            Sign up here.
          </Link>
        </motion.p>
        {error && (
          <p className="text-red-400 text-center mt-3 text-sm">{error}</p>
        )}
      </motion.form>
    </div>
  )
}

export default Login
