import React, { useState } from "react"
import CSTCard from "../../commonComponents/CSTCard/CSTCard"
import "./Calculate.css"
import { Outlet, useNavigate } from "react-router-dom"
import Draw from "./Draw/Draw"
import UploadWrite from "./UploadWrite/UploadWrite"

enum CalculateRender {
  calculate = 0,
  draw = 1,
  uploadWrite = 2,
}

const Calculate = () => {
  const navigate = useNavigate()
  const navigateTo = (path: string) => {
    navigate(path)
  }

  const [show, setShow] = useState(0)

  return (
    <>
      {!show ? (
        <div className="calculate">
          <CSTCard title="Draw" onClick={() => setShow(CalculateRender.draw)}>
            Here you can use the dedicated tool to draw the graph you desire
          </CSTCard>
          <CSTCard
            title="Upload/Write"
            onClick={() => setShow(CalculateRender.uploadWrite)}
          >
            Here you can upload a graph in form of a .txt or a .json or even
            type it yourself. Be careful though. The graph should have the form
            of a matrix has a size nodes x nodes and has at each position (i,j)
            the same weight value as (j,i) otherwise it will be considered a
            faulty graph.
          </CSTCard>
        </div>
      ) : show === CalculateRender.draw ? (
        <Draw />
      ) : (
        <UploadWrite />
      )}
    </>
  )
}

export default Calculate
