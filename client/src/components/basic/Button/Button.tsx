import React, { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import PageSound from "../../../features/sound/PageSound"
import { playSound, selectSound } from "../../../features/sound/sound"
import "./Button.scss"

const Button: React.FC<{
  children: any
  type?: "danger" | "success" | "default"
  onClick?: () => any
  disabled?: boolean
  size?: "small" | "middle" | "big"
  className?: string
}> = ({ children, onClick, disabled, className, type, size }) => {
  const dispatch = useAppDispatch()
  const { globalSound } = useAppSelector(selectSound)

  const getStyle: () => React.CSSProperties = useCallback(() => {
    switch (size) {
      case "big":
        return { padding: "0.5rem 1.25em", fontSize: "big" }
      case "small":
        return { padding: "0.25rem 0.63em", fontSize: "small" }
      default:
        return { padding: "0.37rem 1em", fontSize: "middle" }
    }
  }, [size])

  function clickEvent() {
    dispatch(playSound({ name: "click" }))
    onClick?.()
  }

  return (
    <div
      className={`custom-button ${type || "default"} ${className || ""} ${
        disabled ? "disabled" : ""
      }`}
      style={{ ...getStyle() }}
      onClick={disabled ? (e) => e.preventDefault() : clickEvent}
    >
      {!!globalSound && <PageSound sound="click" />}
      {children}
    </div>
  )
}

export default Button
