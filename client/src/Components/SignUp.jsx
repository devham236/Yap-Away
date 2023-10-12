import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "../Config/axiosConfig"
import useCustomContext from "./../Context/CustomContext"
import genHexCode from "./../Utils/genHexCode"
import { motion } from "framer-motion"
import { formContainer, formItem } from "../Variants/animationVariants"

const SignUp = () => {
  const { userInfo, setUserInfo, checkErrorMsg } = useCustomContext()
  const [signupInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = async (event) => {
    const { name, value, files } = event.target
    setError(null)
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: files ? files[0] : value,
    }))
  }

  const signup = async (event) => {
    event.preventDefault()
    console.log(signupInfo)
    try {
      const result = await axios.post("/user/signup", signupInfo, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log(result)
      sessionStorage.setItem("token", JSON.stringify(result.data.token))
      setUserInfo(result.data)
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="w-full h-full flex items-center">
      <motion.form
        variants={formContainer}
        initial="hidden"
        animate="visible"
        className="w-96 mx-auto p-14 rounded-xl bg-slate-300 dark:bg-slate-900"
      >
        <motion.div
          variants={formItem}
          className="flex flex-col items-center justify mb-6"
        >
          <h1 className="font-bold text-2xl text-center dark:text-white">
            Sign up
          </h1>
        </motion.div>
        <motion.input
          variants={formItem}
          type="text"
          name="username"
          placeholder="Username"
          className={`block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50 outline:border-blue-600 outline-blue-600 dark:outline-none ${
            checkErrorMsg(error, "Username") || checkErrorMsg(error, "All")
              ? "border-2 border-red-500"
              : ""
          }`}
          onChange={handleChange}
        />
        <motion.input
          variants={formItem}
          type="email"
          name="email"
          placeholder="E-Mail"
          className={`block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none ${
            checkErrorMsg(error, "Email") || checkErrorMsg(error, "All")
              ? "border-2 border-red-500"
              : ""
          }`}
          onChange={handleChange}
        />
        <motion.input
          variants={formItem}
          type="password"
          name="password"
          placeholder="Password"
          className={`block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none ${
            checkErrorMsg(error, "Password") || checkErrorMsg(error, "All")
              ? "border-2 border-red-500"
              : ""
          }`}
          onChange={handleChange}
        />
        <motion.input
          variants={formItem}
          type="file"
          name="image"
          className={`block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none`}
          onChange={handleChange}
        />
        <motion.button
          variants={formItem}
          data-testid="signupBtn"
          className="w-full bg-blue-600 mb-6 text-white p-3 rounded-md hover:shadow-xl duration-300"
          type="submit"
          onClick={signup}
        >
          Sign Up
        </motion.button>
        <motion.p
          variants={formItem}
          className="text-sm text-center dark:text-white"
        >
          Already have an Account?
          <Link
            to="/login"
            className="text-blue-600 ml-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300"
          >
            Login here.
          </Link>
        </motion.p>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center mt-3 text-sm"
          >
            {error}
          </motion.p>
        )}
      </motion.form>
    </div>
  )
}

export default SignUp
