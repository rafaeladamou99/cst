import React from "react"
import CSTForm from "../../../commonComponents/CSTForm/CSTForm"
import { Button } from "react-bootstrap"
import GraphComponent from "./GraphDrawer/GraphDrawer"

const Draw = () => {
  const submitButton = () => {
    return (
      <Button
        variant="dark"
        type="submit"
        size="sm"
        style={{ width: "100%", borderRadius: "0.5rem" }}
        onClick={() => {}}
      >
        Submit Graph
      </Button>
    )
  }
  return (
    <CSTForm
      title="Draw Your Graph"
      submitButton={submitButton()}
      size="xlarge"
    >
      {/* <div
        style={{
          height: "70vh",
          border: "1px black solid",
          borderRadius: "1rem",
        }}
      ></div> */}
      <GraphComponent></GraphComponent>
    </CSTForm>
  )
}

export default Draw
