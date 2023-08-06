import React, { useState, useEffect, useMemo, useRef } from "react"
import * as d3 from "d3"

function GraphVisualiser({ matrix }) {
  const [selectedNode, setSelectedNode] = useState(null)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const svgRef = useRef()
  const [k, setK] = useState(10 / matrix.length)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const zoom = d3.zoom().on("zoom", (event) => {
      const { x, y, k } = event.transform
      setK(k)
      setX(x)
      setY(y)
    })
    d3.select(svgRef.current).call(zoom)
  }, [])

  const nodes = useMemo(() => {
    return matrix.map((row, i) => ({
      index: i,
      x: Math.random() * 1920 * 0.9,
      y: Math.random() * 1080 * 0.9
    }))
  }, [])

  console.log(nodes)

  const links = matrix.flatMap((row, i) =>
    row.map((weight, j) => ({
      source: i,
      target: j,
      weight: weight
    }))
  )

  const nonZeroLinks = links.filter((link) => link.weight > 0)
  console.log(nonZeroLinks)

  const colorScale = d3
    .scaleSequential(d3.interpolateRainbow)
    .domain([0, matrix.length])

  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.index)
    )
    .force("charge", d3.forceManyBody().strength(-10000 * (matrix.length / 10)))
    .force(
      "center",
      d3.forceCenter((screenWidth * 0.9) / 2, (screenWidth * 0.9 * 9) / 16 / 2)
    )
    .stop()

  simulation.tick()

  const handleNodeClick = (node) => {
    setSelectedNode(node)
  }

  return (
    <svg
      width={(screenWidth * 0.9).toString()}
      height={((screenWidth * 0.9 * 9) / 16).toString()}
      ref={svgRef}
    >
      <g transform={`translate(${x},${y})scale(${k})`}>
        <g
          transform={`translate(${
            (screenWidth * 0.9) / Math.sqrt(k) - screenWidth * 0.9
          },${
            (screenWidth * 0.9 * 9) / 16 / Math.sqrt(k) -
            (screenWidth * 0.9 * 9) / 16
          })`}
        >
          {links.map((link, i) => (
            <line
              key={i}
              x1={link.source.x}
              y1={link.source.y}
              x2={link.target.x}
              y2={link.target.y}
              stroke="gray"
              strokeWidth={link.weight}
            />
          ))}
          {nodes.map((node) => (
            <circle
              key={node.index}
              cx={node.x}
              cy={node.y}
              r={20}
              fill={colorScale(node.index)}
              stroke="black"
              strokeWidth={selectedNode === node ? 3 : 1}
              onClick={() => handleNodeClick(node)}
              style={{ cursor: "pointer" }}
            />
          ))}
          {nodes.map((node) => (
            <text x={node.x} y={node.y}>
              {node.index}
            </text>
          ))}
          {nonZeroLinks.map((link) => (
            <text
              x={(link.source.x + link.target.x) / 2}
              y={(link.source.y + link.target.y) / 2}
            >
              {link.weight}
            </text>
          ))}
        </g>
      </g>
      <button>Zoom +</button>
      <button>Zoom -</button>
    </svg>
  )
}

export default GraphVisualiser
