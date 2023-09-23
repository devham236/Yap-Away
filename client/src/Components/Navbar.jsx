import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import me from "../Images/me.png"
import useCustomContext from "../Context/CustomContext"

const Navbar = () => {
  const { userInfo, setUserInfo } = useCustomContext()
  const navigate = useNavigate()

  const logout = () => {
    try {
      localStorage.removeItem("token")
      setUserInfo(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full h-20 p-3 rounded-tr-2xl rounded-tl-2xl border-b-2 border-slate-200">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex h-full items-center justify-between w-[30%]">
          <Link
            to="/"
            className="w-[55px] p-1 h-full bg-slate-200 hover:bg-blue-600 duration-200 rounded-full flex items-center justify-center cursor-pointer"
          >
            <img
              src={
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
              }
              alt=""
              className="w-full h-full object-fit rounded-full"
            />
          </Link>
          <div className="">
            <h2 className="font-semibold">{userInfo && userInfo.username}</h2>
          </div>
          <button
            className="bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
            onClick={logout}
          >
            <p className="font-semibold">Logout</p>
          </button>
        </div>
        <div className="flex items-center">
          <Link
            className="mr-2 bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
            to="/signup"
          >
            <p className="font-semibold">Sign Up</p>
          </Link>
          <Link
            className="ml-2 bg-slate-200 p-3 rounded-lg duration-300 hover:bg-blue-600 hover:text-white"
            to="/login"
          >
            <p className="font-semibold">Login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
