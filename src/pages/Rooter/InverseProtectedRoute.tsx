import React from "react"

import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  user: any
}

const InverseProtectedRoute = (props: ProtectedRouteProps) => {
  if (props.user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default InverseProtectedRoute
