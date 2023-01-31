import React from "react"
import "./Navigation.scss"
import RPGLOGO from "../../assets/RPG_Logo.png"
import Link from "../basic/Link/Link"
import { useTranslation } from "react-i18next"

const Navigation = () => {
  const { t } = useTranslation()

  return (
    <div className="nav">
      <div className="nav-link logo">
        <Link to="/">
          <img src={RPGLOGO} />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/wiki">{t("navigation.wiki")}</Link>
      </div>
      <div className="nav-link">
        <Link to="/leaderboard">{t("navigation.leaderboard")}</Link>
      </div>
      <div className="nav-link">
        <Link to="/auth" border>
          {t("navigation.signin")}
        </Link>
      </div>
    </div>
  )
}

export default Navigation
