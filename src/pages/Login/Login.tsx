import React, { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import CSTForm from "../../commonComponents/CSTForm/CSTForm"
import { loginApi } from "../../apis/UsersApis"
import { Alert } from "react-bootstrap"
import { passwordRegex } from "../configuration"

interface LoginProps {}

const Login = (props: LoginProps) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const loginFunction = () => {
    loginApi(username, password)
      .then((res) => {})
      .catch((error) => {
        setShowAlert(true)
        setAlertMessage(error.toString())
      })
  }

  const passwordsValidator = () => {
    if (passwordRegex.test(password)) {
      return false
    }
    return true
  }

  const submitButton = () => {
    return (
      <Button
        variant="dark"
        size="sm"
        style={{ width: "100%", borderRadius: "0.5rem" }}
        onClick={loginFunction}
        disabled={passwordsValidator()}
      >
        Login
      </Button>
    )
  }
  return (
    <CSTForm title="Login" submitButton={submitButton()}>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage.toString()}
        </Alert>
      )}
      <Form.Group controlId="loginForm.username">
        <Form.Control
          type="email"
          placeholder="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="loginForm.password">
        <Form.Control
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Button
        variant="link"
        type="submit"
        size="sm"
        style={{ width: "100%", borderRadius: "0.5rem" }}
        onClick={() => navigate("/signup")}
      >
        Don't have an account yet? Click here
      </Button>
    </CSTForm>
  )
}

export default Login
