import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  user: any
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  if (!props.user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
