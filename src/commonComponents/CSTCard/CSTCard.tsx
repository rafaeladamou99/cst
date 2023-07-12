import React from "react"
import Card from "react-bootstrap/Card"
import "./CSTCard.css"

interface CSTCardProps {
  title: string
  children?: any
  onClick?: () => void
}

const CSTCard = (props: CSTCardProps) => {
  return (
    <Card className="card" onClick={props.onClick}>
      <Card.Title>{props.title}</Card.Title>
      {props.children}
    </Card>
  )
}

export default CSTCard
