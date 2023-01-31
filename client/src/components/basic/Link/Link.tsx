import React from "react"
import { useNavigate } from "react-router-dom"
import "./Link.scss"

const Link: React.FC<{ children: any; border?: boolean; to?: string }> = ({
  children,
  border,
  to,
}) => {
  const navigate = useNavigate()

  const props = {} as any
  if (!!to) props.onClick = () => navigate(to)

  return (
    <div
      {...props}
      className={`custom-link ${border ? "custom-link-border" : ""}`}
    >
      <span>{children}</span>
    </div>
  )
}

export default Link
