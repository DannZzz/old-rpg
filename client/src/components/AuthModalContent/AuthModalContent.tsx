import { useGoogleLogin } from "@react-oauth/google"
import React from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  DiscordLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons"
import { useAppDispatch } from "../../app/hooks"
import { DISORD_AUTH_URL, GOOGLE_PROFILE_API } from "../../contants"
import { setToken } from "../../features/user/user"
import useFetch from "../../hooks/useFetch"
import "./AuthModalContent.scss"

const AuthModalContent = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const requestGoogle = useFetch(GOOGLE_PROFILE_API)
  const request = useFetch()
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const access_token = tokenResponse.access_token
      const profileData = await requestGoogle("", { query: { access_token } })

      request("/private/redirect/google", {
        query: { id: profileData.data.sub },
      }).then((res) => {
        dispatch(setToken(res.data))
        navigate("/")
      })
    },
  })

  function discordAuth() {
    window.location.replace(DISORD_AUTH_URL)
  }

  return (
    <div className="auth-modal-content">
      <span className="title">{t("auth.title")}</span>
      <GoogleLoginButton
        onClick={loginGoogle}
        text={t("auth.login-with", { social: "Google" })}
      />
      <DiscordLoginButton
        onClick={discordAuth}
        text={t("auth.login-with", { social: "Discord" })}
      />
    </div>
  )
}

export default AuthModalContent
