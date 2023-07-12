import React, { useState } from "react"
import { Alert, Button } from "react-bootstrap"
import CSTForm from "../../../commonComponents/CSTForm/CSTForm"
import CSTModal from "../../../commonComponents/CSTModal/CSTModal"
import { Form } from "react-bootstrap"
import {
  postCalculationApi,
  generateGraphApi
} from "../../../apis/CalculationsApis"
import messages from "./messages.json"

enum InputType {
  Write = "Write",
  Upload = "Upload"
}

const UploadWrite = () => {
  const [showModal, setShowModal] = useState(false)
  const [graphTitle, setGraphTitle] = useState("")
  const [graph, setGraph] = useState("")
  const [graphDescription, setGraphDescription] = useState("")
  const [showGraphGenerateModal, setShowGraphGenerateModal] = useState(false)
  const [graphSize, setGraphSize] = useState(0)
  const [graphWeight, setGraphWeight] = useState(0)
  const handleCloseModal = () => setShowModal(false)
  const [strategy, setStrategy] = useState("degree")
  const [constraintAmount, setConstraintAmount] = useState(2)
  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [variant, setVariant] = useState("danger")
  const [inputValid, setInputValid] = useState(false)
  const [strategyValues, setStrategyValues] = useState([
    "degree",
    "degreev2",
    "depth",
    "depthv2",
    "leaves",
    "kruskal",
    "prims"
  ])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [inputType, setInputType] = useState<InputType>(InputType.Write)

  const handleCloseGraphModal = () => setShowGraphGenerateModal(false)

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStrategy(event.target.value)
  }
  const submitButton = () => {
    return (
      <Button
        variant="dark"
        // type="submit"
        size="sm"
        style={{ width: "100%", borderRadius: "0.5rem" }}
        onClick={() => {
          setShowModal(true)
        }}
      >
        Submit Graph
      </Button>
    )
  }

  const footerButtons = () => {
    return (
      <>
        <Button
          variant="outline-dark"
          // type="submit"
          size="sm"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="dark"
          // type="submit"
          size="sm"
          onClick={graphParser}
        >
          Submit
        </Button>
      </>
    )
  }
  const footerButtonsGenerateGraph = () => {
    return (
      <>
        <Button
          variant="outline-dark"
          // type="submit"
          size="sm"
          onClick={handleCloseGraphModal}
        >
          Cancel
        </Button>
        <Button
          variant="dark"
          // type="submit"
          size="sm"
          onClick={generateGraph}
        >
          Generate
        </Button>
      </>
    )
  }

  const submitGraphFunction = (formattedGraph: number[][]) => {
    postCalculationApi(
      graphTitle,
      graphDescription,
      formattedGraph,
      strategy,
      strategy === "kruskal" || strategy === "prims"
        ? undefined
        : constraintAmount
    )
      .then((res) => {
        setInputValid(false)
        setAlertMessage("Successfully Uploaded!")
        setVariant("success")
        setShowAlert(true)
      })
      .catch((error) => {
        setInputValid(false)
        if (error === "Invalid Graph") {
          setAlertMessage(messages["uploadwrite.invalid.input"])
        } else {
          setAlertMessage(error)
        }
        setVariant("danger")
        setShowAlert(true)
      })
    setShowModal(false)
  }

  const graphParser = () => {
    let matrix: number[][] = []
    try {
      matrix = JSON.parse(graph).map((row: any[]) => row.map(Number))
      setInputValid(true)
      submitGraphFunction(matrix)
      // return matrix
    } catch (error) {
      setShowModal(false)
      setVariant("danger")
      setAlertMessage(messages["uploadwrite.invalid.input"])
      setShowAlert(true)
      setInputValid(false)
    }
  }

  const generateGraph = () => {
    if (showGraphGenerateModal) {
      generateGraphApi(graphSize, graphWeight)
        .then((response: number[][]) => {
          console.log(response)
          // const matrixString = response.map((row) => row.join("\t")).join("\n")
          setGraph(JSON.stringify(response))
          if (response.length > 50) {
            setInputType(InputType.Upload)
            const content = JSON.stringify(response)
            const fileName = "graph.txt"
            const fileType = "text/plain"

            // Create a Blob object with the desired content and file type
            const blob = new Blob([content], { type: fileType })

            // Create a File object using the Blob
            const file = new File([blob], fileName, { type: fileType })

            // Invoke the handleFileUpload function with the programmatically constructed file
            setUploadedFile(file)
          }
          handleCloseGraphModal()
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setShowGraphGenerateModal(true)
    }
  }

  const resetGraph = () => {
    setUploadedFile(null)
    setGraph("")
  }

  // Event handler for file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (file && file.type === "text/plain") {
      setUploadedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileContent = e?.target?.result?.toString()
        fileContent && setGraph(fileContent)
      }
      reader.readAsText(file)
    } else {
      resetGraph()
      // Show an error message or perform other error handling
      console.log("Please upload a text file (.txt)")
    }
  }

  // Event handler for file download
  const handleFileDownload = () => {
    if (uploadedFile) {
      // Create a download link
      const downloadLink = document.createElement("a")
      downloadLink.href = URL.createObjectURL(uploadedFile)
      downloadLink.download = uploadedFile?.name

      // Trigger the download
      downloadLink.click()
    }
  }

  const downloadMatrix = (matrix: string, filename: string) => {
    // const content = matrix
    //   .map((row) => row.map((cell) => String(cell)).join(",\t"))
    //   .join("\n")
    const content = matrix
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()

    // Clean up the URL object
    URL.revokeObjectURL(url)
  }

  const changeInputType = (type: InputType) => {
    setGraph("")
    setInputType(type)
  }

  return (
    <>
      <CSTForm
        title="Enter Your Graph"
        submitButton={submitButton()}
        size="large"
      >
        <Form.Label>Constraint</Form.Label>
        <Form.Select value={strategy} onChange={handleDropdownChange}>
          {strategyValues.map((str) => (
            <option value={str}>{str}</option>
          ))}
        </Form.Select>
        {strategy !== "kruskal" && strategy !== "prims" && (
          <>
            <Form.Label>Max {strategy}</Form.Label>
            <Form.Control
              type="number"
              value={constraintAmount}
              onChange={(e) => setConstraintAmount(Number(e.target.value))}
            />
          </>
        )}
        <Form.Label>Graph</Form.Label>
        {showAlert && (
          <Alert
            variant={variant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage.toString()}
          </Alert>
        )}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignContent: "space-between",
            justifyContent: "center",
            gap: "20px"
          }}
        >
          <Form.Check
            type="radio"
            label={InputType.Write}
            value={InputType.Write}
            checked={inputType === InputType.Write}
            onChange={() => changeInputType(InputType.Write)}
          />

          <Form.Check
            type="radio"
            label={InputType.Upload}
            value={InputType.Upload}
            checked={inputType === InputType.Upload}
            onChange={() => changeInputType(InputType.Upload)}
          />
        </div>
        {inputType === InputType.Write && (
          <>
            <Form.Control
              as="textarea"
              rows={3}
              value={graph}
              onChange={(e) => setGraph(e.target.value)}
              style={{
                height: "50vh",
                border: "1px black solid",
                borderRadius: "1rem"
              }}
            />
            <Button
              onClick={() => downloadMatrix(graph, "graph")}
              disabled={!graph}
            >
              Download Graph
            </Button>
          </>
        )}
        {inputType === InputType.Upload && (
          <>
            {!graph ? (
              <Form.Control
                type="file"
                onChange={handleFileUpload}
                style={{
                  border: "1px black solid",
                  borderRadius: "1rem"
                }}
                accept=".txt"
              />
            ) : (
              <>
                <Button
                  onClick={resetGraph}
                  disabled={!uploadedFile}
                  variant="danger"
                >
                  Delete File
                </Button>
                <Button onClick={handleFileDownload} disabled={!uploadedFile}>
                  Download File
                </Button>
              </>
            )}
          </>
        )}

        <Button variant="light" size="sm" onClick={generateGraph}>
          Auto Generate Graph
        </Button>
      </CSTForm>
      <CSTModal
        title="Graph's title and description"
        footer={footerButtons()}
        show={showModal}
        handleClose={handleCloseModal}
      >
        <>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Graph Title"
            value={graphTitle}
            onChange={(e) => setGraphTitle(e.target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={graphDescription}
            onChange={(e) => setGraphDescription(e.target.value)}
          />
        </>
      </CSTModal>
      <CSTModal
        title="Graph's size and weight range"
        footer={footerButtonsGenerateGraph()}
        show={showGraphGenerateModal}
        handleClose={handleCloseGraphModal}
      >
        <>
          <Form.Label>Graph Size</Form.Label>
          <Form.Control
            type="number"
            value={graphSize}
            onChange={(e) => setGraphSize(Number(e.target.value))}
          />
          <Form.Label>Graph Max Weight</Form.Label>
          <Form.Control
            type="number"
            value={graphWeight}
            onChange={(e) => setGraphWeight(Number(e.target.value))}
          />
        </>
      </CSTModal>
    </>
  )
}

export default UploadWrite
