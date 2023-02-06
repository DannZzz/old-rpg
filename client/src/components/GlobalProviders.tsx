import React, { useEffect } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GOOGLE_CLIENT_ID } from "../contants"
import socket from "../socket/socket"

const GlobalProviders = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected")
    })

    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [])

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  )
}

export default GlobalProviders
