import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import useCustomContext from "./../Context/CustomContext"

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

  const handleChange = (event) => {
    const { name, value } = event.target
    setError("")
    setSignUpInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }))
  }

  const signup = async (event) => {
    event.preventDefault()

    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        signupInfo
      )
      console.log(result)
      const { token } = result.data
      sessionStorage.setItem("token", JSON.stringify(token))
      setUserInfo(result.data)
      navigate("/")
      console.log(signupInfo)
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <div className="w-full h-full flex items-center">
      <form className="w-96 mx-auto p-14 border-2 rounded-xl">
        <div className="flex flex-col items-center justify mb-6">
          <h1 className="font-bold text-2xl text-center">Sign up</h1>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="block w-full mb-6 p-3 rounded-md bg-slate-200 outline:border-blue-600 outline-blue-600"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          className="block w-full mb-6 p-3 rounded-md bg-slate-200 outline:border-blue-600 outline-blue-600"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="block w-full mb-6 p-3 rounded-md bg-slate-200 outline:border-blue-600 outline-blue-600"
          onChange={handleChange}
        />
        <button
          className="w-full bg-blue-600 mb-6 text-white p-3 rounded-md hover:shadow-xl duration-300"
          type="submit"
          onClick={signup}
        >
          Sign Up
        </button>
        <p className="text-sm text-center">
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
