import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Calculation,
  SpanningTree,
  generateSpanningTreeApi,
  getCalculationApi
} from "../../../apis/CalculationsApis"
import { Alert, Button, Form } from "react-bootstrap"
import GraphVisualization from "../../../commonComponents/GraphVisualiser/GraphVisualiser"
import CSTModal from "../../../commonComponents/CSTModal/CSTModal"
import { getGraphApi } from "../../../apis/GraphsApis"
import { getSpanningTreeApi } from "../../../apis/SpanningTreesApis"
import { formatExecutionTime } from "./utils"

export type SpanningTreeType = {
  spanningTree: number[][]
  weightSum: number
  constraint: string
  constraintAmount: number
  elapsedTime: number
}

const IndividualCMST = () => {
  const { calcId } = useParams()
  const [calculation, setCalculation] = useState<Calculation | undefined>(
    undefined
  )
  const [showAddCmstModal, setShowAddCmstModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [strategy, setStrategy] = useState("degree")
  const [constraintAmount, setConstraintAmount] = useState(2)
  const [strategyValues, setStrategyValues] = useState([
    "degree",
    "degreev2",
    "depth",
    "depthv2",
    "leaves",
    "kruskal",
    "prims"
  ])
  const [showAlert, setShowAlert] = useState(false)
  const [variant, setVariant] = useState("danger")
  const [alertMessage, setAlertMessage] = useState("")

  const [graph, setGraph] = useState<number[][]>([])
  const [spanningTrees, setSpanningTrees] = useState<SpanningTreeType[]>([])

  const getCalculationApiFn = () => {
    if (calcId) {
      getCalculationApi(calcId)
        .then((res) => {
          setCalculation(res)
          setLoading(false)
          console.log(res)
        })
        .catch((error) => {
          setLoading(false)
        })
    }
  }

  const getGraphApiFn = () => {
    if (calculation?.graph) {
      getGraphApi(calculation.graph)
        .then((res) => {
          setGraph(res)
          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
        })
    }
  }

  // const getSpanningTreeApiFn = (mst: Calculation) => {
  //   const cmsts: SpanningTreeType[] = []
  //   calculation?.spanningTrees?.map((mst: SpanningTree) => {
  //     if (mst?.spanningTree) {
  //       getSpanningTreeApi(mst.spanningTree)
  //         .then((res) => {
  //           cmsts.push({
  //             spanningTree: res,
  //             weightSum: mst.weightSum,
  //             constraint: mst.constraint,
  //             constraintAmount: mst.constraintAmount
  //           })
  //           setLoading(false)
  //           console.log(res)
  //         })
  //         .catch((error) => {
  //           setLoading(false)
  //         })
  //     }
  //   })
  //   setSpanningTrees(cmsts)
  // }

  const getSpanningTreeApiFn = async (mst: Calculation) => {
    const cmsts: SpanningTreeType[] = []
    const promises = calculation?.spanningTrees?.map((mst: SpanningTree) => {
      if (mst?.spanningTree) {
        return getSpanningTreeApi(mst.spanningTree)
          .then((res) => {
            cmsts.push({
              spanningTree: res,
              weightSum: mst.weightSum,
              constraint: mst.constraint,
              constraintAmount: mst.constraintAmount,
              elapsedTime: mst.elapsedTime
            })
            console.log(res)
          })
          .catch((error) => {
            setLoading(false)
          })
      }
    })

    if (promises) {
      await Promise.all(promises)
      cmsts.sort((a, b) => {
        if (a.constraint !== b.constraint) {
          return a.constraint.localeCompare(b.constraint)
        }
        return a.constraintAmount - b.constraintAmount
      })
      setSpanningTrees(cmsts)
      setLoading(false)
    }
  }

  const generateSpanningTreeApiFn = () => {
    if (calcId) {
      generateSpanningTreeApi(
        calcId,
        strategy,
        strategy === "kruskal" || strategy === "prims"
          ? undefined
          : constraintAmount
      )
        .then((res) => {
          setVariant("success")
          setAlertMessage(
            "You have successfully calculated a CMST with the strategy: " +
              strategy +
              (strategy !== "kruskal" && strategy !== "prims"
                ? " and constraint amount: " + constraintAmount
                : "")
          )
          setShowAlert(true)
          getCalculationApiFn()
        })
        .catch((error) => {
          setVariant("danger")
          setAlertMessage(error)
          setShowAlert(true)
        })
      setShowAddCmstModal(false)
    }
  }

  useEffect(() => {
    getCalculationApiFn()
  }, [calcId])

  useEffect(() => {
    getGraphApiFn()
    calculation && getSpanningTreeApiFn(calculation)
  }, [calculation])

  useEffect(() => {
    spanningTrees &&
      spanningTrees.forEach((mst) => {
        if (mst.constraint === "kruskal" || mst.constraint === "prims") {
          const tempStrategyValues = strategyValues.filter(
            (str) => str !== mst.constraint
          )
          setStrategyValues(tempStrategyValues)
        }
      })
  }, [spanningTrees])

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStrategy(event.target.value)
  }

  const footerButtons = () => {
    return (
      <>
        <Button
          variant="outline-dark"
          // type="submit"
          size="sm"
          onClick={() => {
            setShowAddCmstModal(false)
          }}
        >
          Cancel
        </Button>
        <Button
          variant="dark"
          // type="submit"
          size="sm"
          onClick={generateSpanningTreeApiFn}
        >
          Submit
        </Button>
      </>
    )
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

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : !calculation ? (
        <h3>No Calculation was found</h3>
      ) : (
        <div style={{ width: "100%", alignItems: "center" }}>
          {showAlert && (
            <Alert
              variant={variant}
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage.toString()}
            </Alert>
          )}
          <h3>{calculation.title}</h3>
          <h5>Description</h5>
          <Form.Control
            as="textarea"
            rows={3}
            value={calculation.description}
            disabled
            style={{ textAlign: "center" }}
          />
          <h5 style={{ marginTop: "10px", marginBottom: "10px" }}>
            Initial Graph
          </h5>
          <Button
            variant="link"
            onClick={() =>
              downloadMatrix(
                JSON.stringify(graph),
                calculation.title + " graph"
              )
            }
          >
            Download Graph
          </Button>
          <div style={{ border: "2px solid black", borderRadius: "1rem" }}>
            {graph && graph.length > 0 && graph.length <= 100 ? (
              <GraphVisualization matrix={graph} />
            ) : (
              <h5>Graph too large</h5>
            )}
          </div>
          {/* {Here we have each spanning tree} */}
          {calculation?.spanningTrees && (
            <>
              <br></br>
              <h5>Spanning Trees</h5>
              <br></br>
              {spanningTrees &&
                spanningTrees?.map((mst) => (
                  <div
                    style={{
                      border: "2px solid black",
                      borderRadius: "1rem",
                      marginBottom: "10px"
                    }}
                  >
                    <div
                      style={{
                        paddingTop: "10px",
                        paddingBottom: "10px"
                      }}
                    >
                      {mst.constraint === "kruskal" ||
                      mst.constraint === "prims" ? (
                        <h5>Algorithm: {mst.constraint}</h5>
                      ) : (
                        <>
                          <h5>Constraint: {mst.constraint}</h5>
                          <h6>Constraint Amount: {mst.constraintAmount}</h6>
                        </>
                      )}
                      <h6>Total Weight: {mst.weightSum}</h6>
                      <h6>
                        Time Elapsed: {formatExecutionTime(mst.elapsedTime)}
                      </h6>
                      <Button
                        variant="link"
                        onClick={() =>
                          downloadMatrix(
                            JSON.stringify(mst.spanningTree),
                            calculation.title +
                              " " +
                              mst.constraint +
                              " spanning tree"
                          )
                        }
                      >
                        Download {mst.constraint} Spanning Tree
                      </Button>
                    </div>
                    <div
                      style={{
                        borderTop: "2px solid black",
                        borderRadius: "1rem"
                      }}
                    >
                      {typeof mst?.spanningTree !== "string" &&
                      mst.spanningTree.length > 0 &&
                      mst.spanningTree.length <= 100 ? (
                        <GraphVisualization matrix={mst.spanningTree} />
                      ) : (
                        <h5>Spanning tree too large</h5>
                      )}
                    </div>
                  </div>
                ))}
            </>
          )}
          <Button
            variant="dark"
            // type="submit"
            size="sm"
            onClick={() => {
              setShowAddCmstModal(true)
            }}
          >
            Add additional calculation
          </Button>
          <CSTModal
            title="Graph's title and description"
            footer={footerButtons()}
            show={showAddCmstModal}
            handleClose={() => {
              setShowAddCmstModal(false)
            }}
          >
            <>
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
                    onChange={(e) =>
                      setConstraintAmount(Number(e.target.value))
                    }
                  />
                </>
              )}
            </>
          </CSTModal>
        </div>
      )}
    </>
  )
}

export default IndividualCMST
