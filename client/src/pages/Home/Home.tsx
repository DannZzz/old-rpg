import React from "react"
import Snowfall from "react-snowfall"
import "./Home.scss"

const Home = () => {
  return (
    <div className="home">
      <Snowfall />
      <div className="home-content"></div>
    </div>
  )
}

export default Home
