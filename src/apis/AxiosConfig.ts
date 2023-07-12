import axios, { AxiosInstance } from "axios"
import { useHandleApiError } from "./utils"
import store from "../redux/store"
import { setUser } from "../redux/userSlice"

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json"
    // Authorization: `Bearer ${localStorage.access_token}`
  }
})

api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response
  },
  (error) => {
    // Handle errors
    const msg = useHandleApiError(error)
    if (msg === "Invalid Token") {
      store.dispatch(setUser(null))
    }
    throw error
  }
)

export default api
