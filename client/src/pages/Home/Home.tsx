import React from "react"
import { useTranslation } from "react-i18next"
import Snowfall from "react-snowfall"
import { Parallax } from "react-parallax"
import "./Home.scss"

const Home = () => {
  const { t, i18n } = useTranslation()
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }
  return (
    <div className="home">
      <Snowfall />
      <div className="home-content">
        <h1 className="title">{t("home.title-1")}</h1>
      </div>
    </div>
  )
}

export default Home
