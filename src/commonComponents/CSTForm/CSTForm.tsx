import Form from "react-bootstrap/Form"
import "./CSTForm.css"

import React from "react"

type Size = "small" | "medium" | "large" | "xlarge"

interface CSTFormProps {
  title: string
  submitButton: JSX.Element
  children: any
  size?: Size
}

const CSTForm = (props: CSTFormProps) => {
  const formWidth =
    props?.size === "large"
      ? "65%"
      : props?.size === "medium"
      ? "45%"
      : props?.size === "xlarge"
      ? "85%"
      : "30%"
  return (
    <Form style={{ width: formWidth }}>
      <div className="mb-3 display-5">{props.title}</div>
      {props.children}
      {props.submitButton}
    </Form>
  )
}

export default CSTForm
