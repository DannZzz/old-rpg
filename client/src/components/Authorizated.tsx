import React from "react"
import { useAppSelector } from "../app/hooks"
import { selectUser } from "../features/user/user"

const Authorizated: React.FC<{ children?: any; or?: JSX.Element }> = ({
  children,
  or,
}) => {
  const { user } = useAppSelector(selectUser)

  return user ? children : or ? or : <></>
}

export default Authorizated
