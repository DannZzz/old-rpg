import React, { Suspense, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navigation from "../Navigation/Navigation"
import "./App.scss"
import "../../styles/classNames.scss"
import "../../i18n/config"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectSettings } from "../../features/settings/settings"
import { fromLocalStorage, startSoundPlaying } from "../../features/sound/sound"
import MergeProviders from "../MergeProviders"
import { fetchCurrentUser, selectUser } from "../../features/user/user"

const Home = React.lazy(() => import("../../pages/Home/Home"))
const DiscordRedirect = React.lazy(
  () => import("../../pages/api/DiscordRedirect/DiscordRedirect")
)

const App = () => {
  const { i18n } = useTranslation()
  const { language } = useAppSelector(selectSettings)
  const { token, user } = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  // handling lang changes
  useEffect(() => {
    dispatch(fetchCurrentUser())

    document.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          dispatch(startSoundPlaying())
        }, 2000)
      },
      { once: true }
    )
    dispatch(fromLocalStorage())

    i18n.changeLanguage(language)
  }, [])

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [token])

  return (
    <div className="app">
      <BrowserRouter>
        <Navigation />
        <MergeProviders />
        <Routes>
          <Route
            path="/"
            index
            element={
              <Suspense>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/api/ds/redirect"
            element={
              <Suspense>
                <DiscordRedirect />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
