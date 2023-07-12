import { useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import CSTForm from "../../commonComponents/CSTForm/CSTForm"
import { createAccountApi } from "../../apis/UsersApis"
import { Alert } from "react-bootstrap"
import { passwordRegex } from "../configuration"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const navigate = useNavigate()
  const handleNavigation = (path: string) => navigate(path)

  const createAccount = () => {
    if (password === repeatPassword) {
      createAccountApi(username, password)
        .then((res) => {})
        .catch((error) => {
          setShowAlert(true)
          setAlertMessage(error.toString())
        })
    } else {
      setShowAlert(true)
      setAlertMessage("Passwords do not match")
    }
  }

  const passwordsValidator = () => {
    if (
      passwordRegex.test(password) &&
      passwordRegex.test(repeatPassword) &&
      password === repeatPassword
    ) {
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
        disabled={passwordsValidator()}
        onClick={createAccount}
      >
        Signup
      </Button>
    )
  }
  return (
    <CSTForm title="Signup" submitButton={submitButton()}>
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
      <Form.Group controlId="loginForm.password.repeat">
        <Form.Control
          type="password"
          placeholder="repeat password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </Form.Group>
      <br></br>
      <Button
        variant="link"
        type="submit"
        size="sm"
        style={{ width: "100%", borderRadius: "0.5rem" }}
        onClick={() => handleNavigation("/login")}
      >
        Already have an account? Click here
      </Button>
    </CSTForm>
  )
}

export default Signup
