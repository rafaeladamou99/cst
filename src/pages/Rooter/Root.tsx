import React from "react"

import { Outlet } from "react-router-dom"
import { MainNavigation } from "../../components/MainNavigation/MainNavigation"

interface RootProps {
  user: any
  setUser?: () => void
}

const Root = (props: RootProps) => {
  return (
    <>
      <MainNavigation user={props.user} />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root
