import React from "react"
import "./Navigation.scss"
import RPGLOGO from "../../assets/RPG_Logo.png"
import { HiLanguage } from "react-icons/hi2"
import Link from "../basic/Link/Link"
import { useTranslation } from "react-i18next"

import { DownOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Dropdown, Space } from "antd"
import ReactCountryFlag from "react-country-flag"
import { convertToCode } from "../../i18n/formatter"

const Navigation = () => {
  const { t, i18n } = useTranslation()

  const items: MenuProps["items"] = [
    {
      label: <span>English</span>,
      key: "en",
      icon: <ReactCountryFlag countryCode="us" />,
      onClick: () => {
        i18n.changeLanguage("en")
      },
    },
    {
      label: <span>Русский</span>,
      key: "ru",
      icon: <ReactCountryFlag countryCode="ru" />,
      onClick: () => {
        i18n.changeLanguage("ru")
      },
    },
  ]
  return (
    <div className="nav">
      <div className="nav-link logo">
        <Link to="/">
          <img src="https://cdn-icons-png.flaticon.com/512/297/297806.png" />
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
      <div className="nav-right">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <ReactCountryFlag
            style={{
              fontSize: "2em",
              lineHeight: "2em",
            }}
            className="nav-settings-icon"
            countryCode={convertToCode(i18n.languages[0])}
          />
        </Dropdown>
      </div>
    </div>
  )
}

export default Navigation
