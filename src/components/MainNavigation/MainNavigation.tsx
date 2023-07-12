import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useNavigate } from "react-router-dom"
import "./MainNavigation.css"
import { setUser } from "../../redux/userSlice"
import store from "../../redux/store"

interface MainNavigationProps {
  user: boolean
  setUser?: () => void
}

export const MainNavigation = (props: MainNavigationProps) => {
  const navigate = useNavigate()
  const navigateTo = (path: string) => {
    navigate(path)
  }
  const authorised = () => {
    return (
      <Navbar.Collapse className="justify-content-between">
        <Nav>
          <Nav.Link onClick={() => navigateTo("/")}>Dashboard</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/account")}>Account</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/calculate")}>
            Calculate
          </Nav.Link>
          <Nav.Link onClick={() => navigateTo("/mycmsts")}>MyCMSTs</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/about")}>About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => {
              store.dispatch(setUser(null))
              localStorage.removeItem("access_token")
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    )
  }

  const notAuthorised = () => {
    return (
      <Navbar.Collapse className="justify-content-center">
        <Nav>
          <Nav.Link onClick={() => navigateTo("/login")}>Login</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/signup")}>Signup</Nav.Link>
          <Nav.Link onClick={() => navigateTo("/about")}>About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    )
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigateTo("/")}>CST</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {props.user ? authorised() : notAuthorised()}
      </Container>
    </Navbar>
  )
}
