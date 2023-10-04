import axios from "axios"

axios.defaults.baseURL = "https://chat-app-backend-virid.vercel.app/api/v1"
const token = JSON.parse(sessionStorage.getItem("token"))

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default axios
