import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import useCustomContext from "./../Context/CustomContext"
import convertToBase64 from "../Utils/convertToBase64"

const SignUp = () => {
  const { userInfo, setUserInfo } = useCustomContext()
  const [signupInfo, setSignUpInfo] = useState({
    username: "",
    email: "",
    password: "",
    image: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = async (event) => {
    const { name, value, files } = event.target
    setError("")
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
      image: files ? files[0] : "",
    }))
  }

  const signup = async (event) => {
    event.preventDefault()
    // const base64File = await convertToBase64(signupInfo.image)
    try {
      const result = await axios.post("/user/signup", signupInfo)
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
      <form className="w-96 mx-auto p-14 rounded-xl bg-slate-300 dark:bg-slate-900">
        <div className="flex flex-col items-center justify mb-6">
          <h1 className="font-bold text-2xl text-center dark:text-white">
            Sign up
          </h1>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          className="block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none"
          onChange={handleChange}
        />
        {/* <input
          type="file"
          name="image"
          accept=".jpeg, .png, .jpg"
          placeholder="Password"
          className="block w-full mb-6 p-3 rounded-md bg-slate-100 dark:bg-slate-400 dark:placeholder:text-black dark:placeholder:text-opacity-50  outline:border-blue-600 outline-blue-600 dark:outline-none"
          onChange={handleChange}
        /> */}
        <button
          className="w-full bg-blue-600 mb-6 text-white p-3 rounded-md hover:shadow-xl duration-300"
          type="submit"
          onClick={signup}
        >
          Sign Up
        </button>
        <p className="text-sm text-center dark:text-white">
          Already have an Account?
          <Link
            to="/login"
            className="text-blue-600 ml-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300"
          >
            Login here.
          </Link>
        </p>
        {error && (
          <p className="text-red-400 text-center mt-3 text-sm">{error}</p>
        )}
      </form>
    </div>
  )
}

export default SignUp
