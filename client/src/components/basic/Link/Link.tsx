import React from "react"
import { useNavigate } from "react-router-dom"
import "./Link.scss"

const Link: React.FC<{ children: any; border?: boolean; to: string }> = ({
  children,
  border,
  to,
}) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(to)}
      className={`custom-link ${border ? "custom-link-border" : ""}`}
    >
      <span>{children}</span>
    </div>
  )
}

export default Link
