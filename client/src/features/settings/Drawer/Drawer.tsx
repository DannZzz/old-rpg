import React from "react"
import { Drawer as AntDrawer } from "antd"
import { useAppSelector } from "../../../app/hooks"

const Drawer = () => {
  const {
    drawer: { content, ...drawerProps },
  } = useAppSelector((state) => state.settings)
  return <AntDrawer {...drawerProps}>{content}</AntDrawer>
}

export default Drawer
