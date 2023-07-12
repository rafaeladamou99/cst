import React, { useState } from "react"
import CSTForm from "../../commonComponents/CSTForm/CSTForm"
import { Alert, Button } from "react-bootstrap"
import Form from "react-bootstrap/Form"

import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { resetPasswordApi } from "../../apis/UsersApis"
import { passwordRegex } from "../configuration"

const Account = () => {
  const submitButton = () => {
    return (
      <Button
        variant="dark"
        onClick={resetPassword}
        disabled={passwordsValidator()}
      >
        Reset
      </Button>
    )
  }
  const email = useSelector((state: RootState) => state!.user!.email)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [repeatNewPassword, setRepeatNewPassword] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [variant, setVariant] = useState("danger")

  const [modeValue, setModeValue] = useState("1")

  const changeMode = (value: any) => {
    setModeValue(value)
  }

  const passwordsValidator = () => {
    if (
      passwordRegex.test(newPassword) &&
      passwordRegex.test(repeatNewPassword) &&
      newPassword === repeatNewPassword
    ) {
      return false
    }
    return true
  }

  const resetPassword = () => {
    if (newPassword === repeatNewPassword) {
      resetPasswordApi(email, oldPassword, newPassword)
        .then((res) => {
          setVariant("success")
          setShowAlert(true)
          setAlertMessage("Password successfully reset")
        })
        .catch((error) => {
          setVariant("danger")
          setShowAlert(true)
          setAlertMessage(error.toString())
        })
    }
  }

  const modes = [
    { name: "Light Mode", value: "1" },
    { name: "Dark Mode", value: "2" }
  ]
  return (
    <CSTForm submitButton={submitButton()} title="Account">
      {/* <h5>Mode</h5>
      <ButtonGroup>
        {modes.map((mode, idx) => (
          <ToggleButton
            key={idx}
            id={`mode-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-dark" : "light"}
            name="mode"
            value={mode.value}
            checked={modeValue === mode.value}
            onChange={(e) => changeMode(e.currentTarget.value)}
          >
            {mode.name}
          </ToggleButton>
        ))}
      </ButtonGroup> */}
      {/* <h5>User's Email</h5>
      <Form.Group controlId="loginForm.email">
        <Form.Control type="email" placeholder="email" value={email} disabled />
      </Form.Group> */}
      <h5>Reset Password</h5>
      {showAlert && (
        <Alert
          variant={variant}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage.toString()}
        </Alert>
      )}
      <Form.Group controlId="loginForm.old.password">
        <Form.Control
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="loginForm.new.password">
        <Form.Control
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="loginForm.repeat.new.password">
        <Form.Control
          type="password"
          placeholder="Repeat New Password"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
        />
      </Form.Group>
    </CSTForm>
  )
}

export default Account
