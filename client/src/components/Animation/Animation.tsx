import React from "react"
import Snowfall from "react-snowfall"
import { useAppSelector } from "../../app/hooks"
import { selectSettings } from "../../features/settings/settings"

const Animation: React.FC<{ type: "snowfall" }> = ({ type }) => {
  const { graphic } = useAppSelector(selectSettings)

  if (graphic !== "high") return <></>

  switch (type) {
    case "snowfall":
      return <Snowfall />

    default:
      return <></>
  }
}

export default Animation
