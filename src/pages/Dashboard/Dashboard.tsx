import React from "react"
import CSTCard from "../../commonComponents/CSTCard/CSTCard"
import "./Dashboard.css"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()
  const navigateTo = (path: string) => {
    navigate(path)
  }
  return (
    <div className="dashboard">
      <CSTCard title="Account" onClick={() => navigateTo("/account")}>
        <div>
          Here you can change your password, and edit the visual aspect of this
          page. The default is light mode, but you can change it to dark mode.
        </div>
      </CSTCard>
      <CSTCard title="Calculate" onClick={() => navigateTo("/calculate")}>
        <div>
          Here you can make your calculations. You can add your weighted graph,
          add the desired constraint, and calculate the spanning tree based on
          that. The graph entered can be in form of a matrix manually entered,
          written in a file, again in form of a matrix, or drawn. More details
          on the page
        </div>
      </CSTCard>
      <CSTCard title="MyCMSTs" onClick={() => navigateTo("/mycmsts")}>
        <div>
          Here you can view your calculations. You can see the entered weighted
          graph, the entered constraint, and the calculated spanning tree based
          on that. Both the graph and the spanning tree can be exported in form
          of a matrix or visually.
        </div>
      </CSTCard>
      <CSTCard title="About" onClick={() => navigateTo("/about")}>
        <div>
          Here you can learn about us. You can read about the scope of this, the
          applications and how the algorithms work.
        </div>
      </CSTCard>
    </div>
  )
}

export default Dashboard
