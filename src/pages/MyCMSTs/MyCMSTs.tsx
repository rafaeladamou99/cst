import React, { useEffect, useState } from "react"
import CSTCard from "../../commonComponents/CSTCard/CSTCard"
import "./MyCMSTs.css"
import {
  Calculation,
  getUserCalculationsApi
} from "../../apis/CalculationsApis"
import { useNavigate } from "react-router-dom"

const MyCMSTs = () => {
  const navigate = useNavigate()
  const navigateTo = (path: string) => {
    navigate("/mycmsts/" + path)
  }
  const [calculations, setCalculations] = useState<Calculation[]>([])

  useEffect(() => {
    getUserCalculationsApi()
      .then((response) => {
        setCalculations(response)
      })
      .catch((error) => {})
  }, [])

  return (
    <div className="MyCMSTs">
      {calculations.length > 0 ? (
        calculations.map((graph) => (
          <CSTCard title={graph.title} onClick={() => navigateTo(graph.id)}>
            <div className="content">
              <div>{graph.description}</div>
              {/* <div className="constraint">Constraint: {graph.constraint}</div> */}
            </div>
          </CSTCard>
        ))
      ) : (
        <>
          <h5>
            No Constrained Minimum Spanning Tree calculations found associated
            with this account
          </h5>
        </>
      )}
    </div>
  )
}

export default MyCMSTs
