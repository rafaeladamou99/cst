import api from "./AxiosConfig"
import { useHandleApiError } from "./utils"
import { setUser } from "../redux/userSlice"
import store from "../redux/store"

// const setAuthorizationHeader = (accessToken: string) => {
//   api.defaults.headers["Authorization"] = `Bearer ${accessToken}`
// }

export const loginApi = (email: string, password: string) =>
  api
    .post("/auth/login", { email, password })
    .then((response) => {
      const token = response.data.access_token
      localStorage.setItem("access_token", token)
      store.dispatch(setUser(response.data))
      // setAuthorizationHeader(token)
      return response.data
    })
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })

export const createAccountApi = (email: string, password: string) =>
  api
    .post("/users", { email, password })
    .then((response) => {
      const token = response.data.access_token
      localStorage.setItem("access_token", token)
      store.dispatch(setUser(response.data))
      return response.data
    })
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })

export const resetPasswordApi = (
  email: string,
  oldPassword: string,
  newPassword: string
) =>
  api
    .patch("users/resetPassword", { email, oldPassword, newPassword })
    .then((response) => {})
    .catch((error) => {
      const msg = useHandleApiError(error)
      throw new Error(msg)
    })
