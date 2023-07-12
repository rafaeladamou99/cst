import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login/Login"
import Root from "./pages/Rooter/Root"

import Error from "./pages/Error/Error"

import ProtectedRoute from "./pages/Rooter/ProtectedRoute"

import "bootstrap/dist/css/bootstrap.min.css"
import Account from "./pages/Account/Account"
import Dashboard from "./pages/Dashboard/Dashboard"
import Signup from "./pages/Signup/Signup"
import InverseProtectedRoute from "./pages/Rooter/InverseProtectedRoute"
import Calculate from "./pages/Calculate/Calculate"
import MyCMSTs from "./pages/MyCMSTs/MyCMSTs"
import About from "./pages/About/About"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import { useEffect } from "react"
import api from "./apis/AxiosConfig"
import IndividualCMST from "./pages/MyCMSTs/IndividualCMST/IndividualCMST"

function App() {
  useEffect(() => {
    if (localStorage?.access_token) {
      api.defaults.headers[
        "Authorization"
      ] = `Bearer ${localStorage.access_token}`
    } else {
      api.defaults.headers["Authorization"] = ""
    }
  }, [localStorage.access_token])

  const user = useSelector((state: RootState) => state.user?.id)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} />,
      errorElement: <Error />,
      children: [
        {
          element: <InverseProtectedRoute user={user} />,
          children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> }
          ]
        },
        {
          element: <ProtectedRoute user={user} />,
          children: [
            { path: "/", element: <Dashboard /> },
            { path: "/account", element: <Account /> },
            { path: "/calculate", element: <Calculate /> },
            { path: "/mycmsts", element: <MyCMSTs /> },
            { path: "/mycmsts/:calcId", element: <IndividualCMST /> },
            { path: "/about", element: <About /> }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
