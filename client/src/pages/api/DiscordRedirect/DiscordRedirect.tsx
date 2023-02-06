import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../app/hooks"
import { setToken } from "../../../features/user/user"
import useFetch from "../../../hooks/useFetch"
import "./DiscordRedirect.scss"

const DiscordRedirect = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const request = useFetch()

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.search)
    const code = fragment.get("code")
    if (code) {
      request("/private/redirect/discord", { query: { code } }).then((res) => {
        dispatch(setToken(res.data))
        navigate("/")
      })
    }
  })

  return <div>Ok</div>
}

export default DiscordRedirect
