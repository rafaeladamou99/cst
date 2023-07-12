import React, { useRef } from "react"
import * as d3 from "d3"

const GraphDrawer = () => {
  const svgRef = useRef(null)

  const handleClick = (event: any) => {
    const svg = d3.select(svgRef.current)
    const { offsetX, offsetY } = event.nativeEvent

    svg
      .append("circle")
      .attr("cx", offsetX)
      .attr("cy", offsetY)
      .attr("r", 20)
      .attr("fill", "steelblue")
  }

  return (
    <div>
      <svg
        ref={svgRef}
        width={400}
        height={400}
        onClick={handleClick}
        style={{ border: "1px solid black" }}
      ></svg>
    </div>
  )
}

export default GraphDrawer
