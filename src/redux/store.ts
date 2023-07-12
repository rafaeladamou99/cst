import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"

const store = configureStore({
  reducer: {
    user: userSlice
  }
})

export type RootState = {
  user: {
    id: string
    email: string
    calculations: string[]
    access_token: string
  } | null
}

export default store
