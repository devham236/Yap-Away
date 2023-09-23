import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000/api/v1"
const token = sessionStorage.getItem("token")

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default axios
