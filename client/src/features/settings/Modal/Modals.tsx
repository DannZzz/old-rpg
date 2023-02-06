import React from "react"
import { Modal as AntdModal } from "antd"
import { useAppSelector } from "../../../app/hooks"
import { selectSettings } from "../settings"

const Modals = () => {
  const { modals } = useAppSelector(selectSettings)
  return (
    <>
      {modals.map((modal) => {
        const { id, ...props } = modal
        return <AntdModal key={id} {...props} />
      })}
    </>
  )
}

export default Modals
